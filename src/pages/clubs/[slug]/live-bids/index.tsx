import {
  HStack,
  VStack,
  Button,
  Icon,
  Input,
  Countdown,
  Box,
  useGeneralContext,
  useInputChange,
  Text,
  DateUtility,
} from '@holdr-ui/react';
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import {
  ArtistClubActiveBiddersList,
  ArtistClubInactiveBiddersList,
  ArtistClubMembershipPerksSummaryList,
} from './ui';
import {
  IClub,
  MembershipCard,
  useHasPaymentMethodSuspenseQuery,
  useCurrentUser,
  useSuspenseGetArtist,
} from '../../../../features';
import {
  getRandomNumberInRange,
  Head,
  makePath,
  useAlertDialog,
  voidFn,
} from '../../../../shared';
import { dummyPerks } from '../../shared';
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
} from 'react-router-dom';
import dayjs from 'dayjs';
import { useCreateBid } from '../../../../features/auction/shared/hooks';
import { useGetAuction } from '../../../../features/auction/shared/hooks/use-get-auction';
import {
  ContenderEdge,
  ContendersData,
  useGetContenders,
} from '../../../../features/auction/shared/hooks/use-get-contenders';
import {
  Field,
  Form,
  Formik,
  FormikHandlers,
  FormikHelpers,
} from 'formik';
import { object, string } from 'yup';
import { FieldProps } from 'formik-stepper/dist/types';
import { useDeleteBid } from '../../../../features/auction/shared/hooks/use-delete-bid';
import { OutletContext } from '../ui/artist-club.tabs';

const DialogState = {
  addPayment: {
    title: 'Add a payment method',
    description:
      'To participate in a live auction, please add a payment method. This allows you to bid and win memberships in real-time auctions',
    actionText: 'Add payment',
    cancelText: 'Add later',
  },
};

function useAddPaymentMethod() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return () =>
    navigate(makePath(['payment-method', 'add']), {
      state: {
        previousLocation: pathname,
      },
    });
}

export interface IBidder {
  id: string;
  displayName: string;
  bidId: number;
  createdAt: Date;
  amount: number;
}

interface FormValues {
  amount: string;
}

function ArtistClubLiveBidsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onToggleAlert } = useOutletContext<OutletContext>();

  const { slug } = useParams();

  const currentUser = useCurrentUser();

  const { openWith } = useAlertDialog();

  const { value, handleOnChange } = useInputChange('');

  const { id: currentUserId } = useCurrentUser();

  const { bidCreated, onSubmit: submitBid } = useCreateBid();
  const { bidDeleted, onSubmit: deleteBid } = useDeleteBid();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { data: hasPMData } = useHasPaymentMethodSuspenseQuery();

  const addPaymentMethod = useAddPaymentMethod();

  const { state: club } = useGeneralContext<IClub>();

  const { data: auctionData, error: auctionError } = useGetAuction(
    club.id,
  );

  const {
    data: contendersData,
    refetch: refetchContenders,
    error: activeContendersError,
  } = useGetContenders(auctionData?.auction?.id, 'Active');
  const {
    data: outOfContentionData,
    refetch: refetchOutOfContention,
    error: inactiveContendersError,
  } = useGetContenders(auctionData?.auction?.id, 'Inactive');

  const [bidId, setBidId] = useState<number | null>(null);
  const [dialog, setDialog] = useState(0);
  const [congrats, setCongrats] = useState(true);

  const { dialogMessage } = location.state || {};

  const previousInactiveBiddersRef = useRef<IBidder[]>([]);

  const activeAuction =
    auctionData?.auction?.id != null && auctionError == null;

  const auctionEndDate = auctionData?.auction?.endsAt;

  const getBiddersList = (
    biddersData: ContendersData | undefined,
    activeAuction: boolean,
  ) => {
    if (biddersData == null || !activeAuction) {
      return [];
    }

    return [...biddersData!.contenders.edges].map((edge) => ({
      id: edge.node.owner.id,
      displayName: edge.node.owner.displayName,
      bidId: edge.node.bid.id,
      createdAt: dayjs(edge.node.bid.createdAt).toDate(),
      amount: edge.node.bid.amount,
    }));
  };

  const activeBidders: IBidder[] = getBiddersList(
    contendersData,
    activeAuction,
  );

  const inactiveBidders: IBidder[] = getBiddersList(
    outOfContentionData,
    activeAuction,
  );

  useEffect(() => {
    checkIfUserIsOutbid();
  }, [auctionData, inactiveBidders, currentUserId, onToggleAlert]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      showCongratsOnWinOrNavigateToBio();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [congrats, auctionData, activeBidders]);

  function showCongratsOnWinOrNavigateToBio() {
    const auctionEndDate = auctionData?.auction?.endsAt;

    if (auctionEndDate) {
      const auctionIsExpired = getAuctionIsExpired(auctionEndDate);

      if (auctionIsExpired) {
        if (congrats) {
          const bidderIsEligible = activeBidders.some(
            (bidder) => bidder.id === currentUserId,
          );

          if (bidderIsEligible) {
            setCongrats(false);
            openWith({
              title: 'Congratulations!',
              description: `You are now an exclusive member of ${artistData.artist.name}’s club. Get ready to explore exclusive benefits and exciting opportunities!`,
              cancelText: 'Later',
              actionText: 'View membership',
              onAction: () => {},
            });
          } else {
            goToBio();
          }
        }
      }
    }
  }

  const goToBio = () => {
    navigate(location.pathname.replace('live-bids', 'bio'), {
      replace: true,
    });
  };

  function checkIfUserIsOutbid() {
    const auctionEndDate = auctionData?.auction?.endsAt;

    if (auctionEndDate) {
      const auctionIsExpired = getAuctionIsExpired(auctionEndDate);

      if (!auctionIsExpired) {
        const previousInactiveBidders = previousInactiveBiddersRef.current;

        inactiveBidders.forEach((bidder) => {
          const wasOutbidPreviously = previousInactiveBidders.some(
            (prevBidder: IBidder) => prevBidder.id === bidder.id,
          );
          if (bidder.id === currentUserId && !wasOutbidPreviously) {
            onToggleAlert(1);
          }
        });

        previousInactiveBiddersRef.current = inactiveBidders;
      }
    }
  }

  useEffect(() => {
    if (
      !hasPMData.hasPaymentMethod &&
      currentUser.id !== artistData.artist.accountId
    )
      openWith({ ...DialogState.addPayment, onAction: addPaymentMethod });
  }, []);

  function addDays(_date: Date, days: number) {
    const date = new Date(_date);
    date.setDate(date.getDate() + days);
    return date;
  }

  const confirmWithdraw = (bidId: number) => {
    setBidId(bidId);
    openWith({
      title: 'Are you sure you want to withdraw?',
      description: `Are you sure you want to withdraw your bid from the auction? This action cannot be undone.`,
      cancelText: 'Do not withdraw',
      actionText: 'Yes, Withdraw Bid',
      onAction: () => {
        deleteBid(bidId);
      },
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  ) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    handleChange(e);
  };

  const getAuctionIsExpired = (currentAuctionEndsAt: Date) =>
    DateUtility.getTimeToExpiry(currentAuctionEndsAt, new Date()) <= 0;

  /*
   * Checks the contenders list to see if the current user
   * placed a bid already and returns the bidId if there
   * is one
   */
  const getPreviousBidId = (
    fullContendersData: ContenderEdge[],
    currentUserId: string,
  ) =>
    fullContendersData
      .filter(
        (edge: ContenderEdge) => edge.node.owner.id === currentUserId,
      )
      .reduce<number | null>(
        (acc, edge: ContenderEdge) => edge.node.bid.id,
        null,
      );

  const onPlaceBid = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    if (
      !auctionError &&
      !activeContendersError &&
      !inactiveContendersError
    ) {
      try {
        const auctionId = auctionData!.auction.id;

        const fullContendersData = [
          ...contendersData!.contenders.edges,
          ...outOfContentionData!.contenders.edges,
        ];

        const previousBid: number | null = getPreviousBidId(
          fullContendersData,
          currentUserId,
        );

        const bidExists = previousBid != null;
        const id = bidExists ? previousBid : auctionId;

        await submitBid(
          {
            id,
            amount: Number(values.amount),
          },
          bidExists,
        );
        resetForm();
        await refetchContenders({ id: auctionId, filter: 'Active' });
        await refetchOutOfContention({
          id: auctionId,
          filter: 'Inactive',
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const auctionPrice = auctionData?.auction?.entryPrice || 0;
  const auctionMemberships =
    auctionData?.auction?.numberOfMemberships || 0;

  const initialValues = {
    amount: '',
  };

  const validationSchema = object({
    amount: string().required('Amount is required'),
  });

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />
      <VStack gap={6}>
        <HStack gap={4} h={500}>
          <Box flex={1} h='100%'>
            <MembershipCard
              showPerksOnHover={false}
              data={{
                coverImage: club.coverImage,
                price: auctionPrice,
                perks: dummyPerks,
              }}
            />
          </Box>
          <VStack flex={1} radius={4}>
            <ArtistClubMembershipPerksSummaryList clubId={club.id} />
            <VStack gap={2} flex={1} justify={'flex-end'}>
              <HStack gap={2} h={'24px'} items={'center'}>
                <Icon name='time-outline' />
                {auctionEndDate && (
                  <Countdown
                    size='base'
                    color='white500'
                    targetDate={auctionEndDate}
                  />
                )}
              </HStack>
              {currentUser.id !== artistData.artist.accountId && (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={
                    hasPMData.hasPaymentMethod
                      ? onPlaceBid
                      : addPaymentMethod
                  }
                >
                  {({ handleChange, isSubmitting, values }) => (
                    <Form>
                      <Field name='amount'>
                        {({ field, form }: any) => (
                          <>
                            <Input
                              {...field}
                              type='string'
                              placeholder='Enter Amount'
                              _placeholder={{
                                color: '$base600',
                              }}
                              color='white500'
                              css={{
                                backgroundColor: '$purple1000',
                                height: '48px',
                                fontSize: '18px',
                              }}
                              onChange={(e) =>
                                handleInputChange(e, handleChange)
                              }
                            />
                            <Box py={1}>
                              {form.errors.amount &&
                                form.touched.amount && (
                                  <Text
                                    size={1}
                                    css={{
                                      color: '$danger200',
                                    }}
                                  >
                                    {form.errors.amount}
                                  </Text>
                                )}
                            </Box>
                          </>
                        )}
                      </Field>
                      <Button
                        type='submit'
                        radius={2}
                        colorTheme='purple500'
                        fullWidth
                        style={{
                          height: '48px',
                        }}
                        disabled={isSubmitting}
                      >
                        Place Bid
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </VStack>
          </VStack>
        </HStack>
        <ArtistClubActiveBiddersList
          confirmWithdraw={confirmWithdraw}
          currentUserId={currentUserId}
          bidders={activeBidders}
          numberOfMemberships={auctionMemberships}
          clubId={club.id}
        />
        <ArtistClubInactiveBiddersList
          confirmWithdraw={confirmWithdraw}
          currentUserId={currentUserId}
          bidders={inactiveBidders}
          clubId={club.id}
        />
      </VStack>
    </Fragment>
  );
}

ArtistClubLiveBidsPage.displayName = 'ArtistClubLiveBidsPage';
export default ArtistClubLiveBidsPage;
