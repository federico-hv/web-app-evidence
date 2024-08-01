import {
  HStack,
  VStack,
  Button,
  Icon,
  Box,
  useGeneralContext,
  useInputChange,
  Countdown,
} from '@holdr-ui/react';
import { Fragment, useState } from 'react';
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
  useSuspenseGetClub,
  useGetAuctionSuspenseQuery,
  useGetClubPerks,
  useSuspenseGetClubPerks,
} from '../../../../features';
import {
  darkInputStyles,
  GQLRenderer,
  handleFieldError,
  Head,
  InputTextField,
  makePath,
  useAlertDialog,
} from '../../../../shared';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAuctionQuery } from '../../../../features';
import { keyframes } from '@stitches/react';
import { navigate } from '@storybook/addon-links';

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

function CardLoading() {
  const animationName = createShimmer(
    'rgba(152, 152, 255, 0.05)',
    'rgba(152, 152, 255, 0.15)',
  );

  return (
    <Box flex={1} h='100%'>
      <Box
        radius={3}
        css={{
          animation: `${animationName} 500ms linear infinite alternate`,
        }}
        h='100%'
        w='100%'
      />
    </Box>
  );
}

export const createShimmer = (startColor: string, endColor: string) =>
  keyframes({
    '0%': {
      backgroundColor: startColor,
    },
    '100%': {
      backgroundColor: endColor,
    },
  });

function AuctionCard() {
  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data: perksData } = useSuspenseGetClubPerks(clubData.club.id);

  return (
    <Box flex={1} h='100%'>
      <MembershipCard
        showPerksOnHover={false}
        data={{
          coverImage: clubData.club.coverImage,
          price: auctionData.auction.entryPrice,
          perks: perksData.clubPerks.map(
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
  const { slug } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const addPaymentMethod = useAddPaymentMethod();

  const currentUser = useCurrentUser();

  const { data: artistData } = useSuspenseGetArtist({ slug });

  const { data: hasPaymentMethodData } =
    useHasPaymentMethodSuspenseQuery();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const [value, setValue] = useState<string>();

  const bidError = handleFieldError(value, {
    keyName: 'Bid amount',
    compare: {
      value: parseInt(value || '0'),
      gt: auctionData.auction.entryPrice - 1,
    },
  });

  return (
    <Fragment>
      {currentUser.id !== artistData.artist.accountId && (
        <VStack
          as='form'
          gap={2}
          onSubmit={(e) => {
            e.preventDefault();

            if (!hasPaymentMethodData.hasPaymentMethod) {
              navigate(makePath([]), {
                state: { previousLocation: location.pathname },
              });

              return;
            }
          }}
        >
          <InputTextField
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
            disabled={
              value === undefined ||
              value.length === 0 ||
              (bidError !== undefined && bidError.length > 0)
            }
          >
            Place Bid
          </Button>
        </VStack>
      )}
    </Fragment>
  );
}

function ArtistClubLiveBidsPage() {
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { state: club } = useGeneralContext<IClub>();

  const { data: auctionData, loading: loadingAuction } =
    useGetAuctionQuery(club.id);

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Live Bids'
        description='A catalog of memberships that are being offered by artists.'
      />
      <GQLRenderer>
        <VStack gap={6}>
          <HStack gap={4} h={500}>
            <GQLRenderer LoadingFallback={<CardLoading />}>
              <AuctionCard />
            </GQLRenderer>
            <VStack flex={1} gap={5}>
              <AuctionCountdown />
              <ArtistClubMembershipPerksSummaryList clubId={club.id} />
              <AuctionPlaceBid />
            </VStack>
          </HStack>
          <ArtistClubActiveBiddersList />
          <ArtistClubInactiveBiddersList />
        </VStack>
      </GQLRenderer>
    </Fragment>
  );
}

ArtistClubLiveBidsPage.displayName = 'ArtistClubLiveBidsPage';
export default ArtistClubLiveBidsPage;
