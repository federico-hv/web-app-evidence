import {
  HStack,
  VStack,
  Button,
  Icon,
  Box,
  useGeneralContext,
  useInputChange,
} from '@holdr-ui/react';
import { Fragment } from 'react';
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
import { Head, makePath, useAlertDialog } from '../../../../shared';
import { dummyPerks } from '../../shared';
import {
  useLocation,
  useNavigate,
  useParams,
  useOutletContext,
} from 'react-router-dom';
import { useGetAuctionQuery } from '../../../../features';

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

  const { slug } = useParams();

  const currentUser = useCurrentUser();

  const { openWith } = useAlertDialog();

  const { value, handleOnChange } = useInputChange('');

  const { id: currentUserId } = useCurrentUser();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { data: hasPMData } = useHasPaymentMethodSuspenseQuery();

  const addPaymentMethod = useAddPaymentMethod();

  const { state: club } = useGeneralContext<IClub>();

  const { data: auctionData, error: auctionError } = useGetAuctionQuery(
    club.id,
  );

  // const {
  //   data: contendersData,
  //   refetch: refetchContenders,
  //   error: activeContendersError,
  // } = useGetContenders(auctionData?.auction?.id, 'Active');
  // const {
  //   data: outOfContentionData,
  //   refetch: refetchOutOfContention,
  //   error: inactiveContendersError,
  // } = useGetContenders(auctionData?.auction?.id, 'Inactive');

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
                price: 10,
                perks: dummyPerks,
              }}
            />
          </Box>
          <VStack flex={1} radius={4}>
            <ArtistClubMembershipPerksSummaryList clubId={club.id} />
            <VStack gap={2} flex={1} justify={'flex-end'}>
              <HStack gap={2} h={'24px'} items={'center'}>
                <Icon name='time-outline' />
                {/*{auctionEndDate && (*/}
                {/*  <Countdown*/}
                {/*    size='base'*/}
                {/*    color='white500'*/}
                {/*    targetDate={auctionEndDate}*/}
                {/*  />*/}
                {/*)}*/}
              </HStack>
              {currentUser.id !== artistData.artist.accountId && (
                <Button
                  type='submit'
                  radius={2}
                  colorTheme='purple500'
                  fullWidth
                  style={{
                    height: '48px',
                  }}
                  // disabled={isSubmitting}
                >
                  Place Bid
                </Button>
              )}
            </VStack>
          </VStack>
        </HStack>
        <ArtistClubActiveBiddersList />
        <ArtistClubInactiveBiddersList />
      </VStack>
    </Fragment>
  );
}

ArtistClubLiveBidsPage.displayName = 'ArtistClubLiveBidsPage';
export default ArtistClubLiveBidsPage;
