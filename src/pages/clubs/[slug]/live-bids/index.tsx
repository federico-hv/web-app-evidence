import {
  Box,
  Button,
  Center,
  Countdown,
  HStack,
  Icon,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { Fragment, useEffect, useState } from 'react';
import {
  ArtistClubActiveBiddersList,
  ArtistClubInactiveBiddersList,
  ArtistClubMembershipPerksSummaryList,
} from './ui';
import {
  AuctionCard,
  IClub,
  ISaveAuctionViewsArgs,
  ISaveAuctionViewsResponse,
  ISaveClubViewsArgs,
  ISaveClubViewsResponse,
  SAVE_AUCTION_VIEWS,
  SAVE_CLUB_VIEWS,
  SaveViews,
  useAddPaymentMethod,
  useBidSuspenseQuery,
  useCreateBid,
  useCurrentUser,
  useGetArtist,
  useGetAuctionSuspenseQuery,
  useHasPaymentMethodSuspenseQuery,
  useSuspenseGetArtist,
  useSuspenseGetClub,
  useSuspenseGetClubPerks,
  useUpdateBid,
} from '../../../../features';
import {
  CustomSkeleton,
  darkInputStyles,
  GQLRenderer,
  handleFieldError,
  Head,
  InputTextField,
  Loader,
  makePath,
  Paths,
  useAlertDialog,
} from '../../../../shared';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  AuctionEventNameEnum,
  useAuctionAlertContext,
} from '../shared/contexts';

const DialogState = {
  addPayment: {
    title: 'Add a payment method',
    description:
      'To participate in a live auction, please add a payment method. This allows you to bid and win memberships in real-time auctions',
    actionText: 'Add payment',
    cancelText: 'Add later',
  },
};

function AuctionBannerCard() {
  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData, refetch } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data: perksData } = useSuspenseGetClubPerks(clubData.club.id);

  if (!auctionData.auction) {
    refetch().catch(() => (
      <Navigate to={makePath([Paths.clubs, slug || ''])} replace />
    ));

    return <Fragment />;
  }

  return (
    <Box flex={1} h='100%'>
      <AuctionCard
        disableWatchlist
        showPerksOnHover={false}
        data={{
          coverImage: clubData.club.coverImage,
          price: auctionData.auction.entryPrice,
          perks: perksData.clubPerks.perks.map(
            ({ description }) => description || '',
          ),
        }}
      />
    </Box>
  );
}

function AuctionCountdown() {
  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  return (
    <HStack gap={2} items='center'>
      <Icon name='time-outline' size='xl' />
      <Countdown
        size='xl'
        color='white500'
        targetDate={auctionData.auction.endsAt}
      />
    </HStack>
  );
}

function AuctionPlaceBid() {
  const { loading: loadingCreateBid, createBid } = useCreateBid();

  const { loading: loadingUpdateBid, updateBid } = useUpdateBid();

  const { openWith } = useAlertDialog();

  const { update } = useAuctionAlertContext();

  const { slug } = useParams();

  const addPaymentMethod = useAddPaymentMethod();

  const currentUser = useCurrentUser();

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const { data: hasPaymentMethodData } =
    useHasPaymentMethodSuspenseQuery();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data: bidData } = useBidSuspenseQuery(auctionData.auction.id);

  const [value, setValue] = useState<string>();

  const bidError = handleFieldError(value, {
    keyName: 'Bid amount',
    compare: {
      value: parseInt(value || '0'),
      gt: auctionData.auction.entryPrice - 1,
      message: {
        gt: `Bid amount must at least be equal to the entry price of $${auctionData.auction.entryPrice} USD`,
      },
    },
  });

  useEffect(() => {
    if (
      !hasPaymentMethodData.hasPaymentMethod &&
      currentUser.id !== artistData.artist.accountId
    )
      openWith({ ...DialogState.addPayment, onAction: addPaymentMethod });
  }, []);

  return (
    <Fragment>
      {currentUser.id !== artistData.artist.accountId && (
        <VStack
          as='form'
          gap={2}
          onSubmit={async (e) => {
            e.preventDefault();

            if (!value) {
              return;
            }

            if (!hasPaymentMethodData.hasPaymentMethod) {
              addPaymentMethod();
              return;
            }

            if (bidData.bid) {
              const res = await updateBid(
                {
                  id: bidData.bid.bid.id,
                  amount: parseInt(value),
                },
                auctionData.auction.id,
              );

              if (res && res.data && res.data.updateBid) {
                setValue('');
              }
              update({
                status: 'success',
                eventName: AuctionEventNameEnum.updated,
              });
            } else {
              const res = await createBid(
                {
                  id: auctionData.auction.id,
                  amount: parseInt(value),
                },
                auctionData.auction.id,
              );

              if (res && res.data && res.data.createBid) {
                setValue('');
                update({
                  status: 'success',
                  eventName: AuctionEventNameEnum.success,
                });
              }
            }
          }}
        >
          <InputTextField
            leftElement={
              <Center color='white700' fontSize={6} w={55}>
                USD
              </Center>
            }
            size='lg'
            className={darkInputStyles()}
            name='bidAmount'
            errorText={bidError}
            value={value}
            onChange={(e) =>
              setValue(e.target.value.replace(/[^0-9]+/gm, ''))
            }
          />
          <Button
            type='submit'
            radius={2}
            colorTheme='purple500'
            fullWidth
            style={{
              height: '48px',
            }}
            isLoading={loadingUpdateBid || loadingCreateBid}
            loadingText={bidData.bid ? 'Updating Bid' : 'Placing Bid'}
            disabled={
              loadingCreateBid ||
              loadingUpdateBid ||
              value === undefined ||
              value.length === 0 ||
              (bidError !== undefined && bidError.length > 0)
            }
          >
            {bidData.bid ? 'Update' : 'Place'} Bid
          </Button>
        </VStack>
      )}
    </Fragment>
  );
}

function SaveAuctionView() {
  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  return (
    <SaveViews<ISaveAuctionViewsResponse, ISaveAuctionViewsArgs>
      mutation={SAVE_AUCTION_VIEWS}
      name='saveAuctionViews'
      args={{ auctionIds: [auctionData.auction.id] }}
    />
  );
}

function ArtistClubLiveBidsPage() {
  const { slug } = useParams();

  const { data: artistData, loading } = useGetArtist({
    slug,
  });

  const { state: club } = useGeneralContext<IClub>();

  return (
    <Loader loading={loading}>
      {artistData && (
        <Fragment>
          <Head
            prefix={`${artistData.artist.name}'s Club -`}
            title='Live Bids'
            description='A catalog of memberships that are being offered by artists.'
          />
          <SaveAuctionView />
          <GQLRenderer>
            <VStack gap={6}>
              <HStack gap={4} h={500}>
                <GQLRenderer
                  LoadingFallback={<CustomSkeleton radius={3} />}
                >
                  <AuctionBannerCard />
                </GQLRenderer>
                <VStack flex={1} gap={5}>
                  <ArtistClubMembershipPerksSummaryList clubId={club.id} />
                  <AuctionCountdown />
                  <AuctionPlaceBid />
                </VStack>
              </HStack>
              <ArtistClubActiveBiddersList />
              <ArtistClubInactiveBiddersList />
            </VStack>
          </GQLRenderer>
        </Fragment>
      )}
    </Loader>
  );
}

ArtistClubLiveBidsPage.displayName = 'ArtistClubLiveBidsPage';
export default ArtistClubLiveBidsPage;
