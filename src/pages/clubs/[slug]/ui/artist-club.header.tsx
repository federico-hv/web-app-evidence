import {
  Button,
  Center,
  Heading,
  HStack,
  useDisclosure,
} from '@holdr-ui/react';
import {
  ConnectedAccountStatus,
  GET_CONNECT_ACCOUNT_STATUS,
  useCurrentUser,
  useDeleteAuction,
  useGetAuctionSuspenseQuery,
  useSuspenseGetArtist,
  useSuspenseGetClub,
} from '../../../../features';
import ArtistClubSocialButton from './artist-club-social.button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makePath, Paths, useAlertDialog } from '../../../../shared';
import { useLazyQuery, useQuery } from '@apollo/client';
import { OnboardingFormDialog } from '../../../../pages/overlays/setup-artist-profile/connect-onboarding/ui';
import ArtistClubHeaderAuctionButton from './artist-club.header.auction.button';

function ArtistClubHeader() {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug: slug || '' });

  const { deleteAuction } = useDeleteAuction();

  const { openWith } = useAlertDialog();

  const {
    isOpen: isDialogOpen,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
    {
      fetchPolicy: 'network-only',
    },
  );

  const { data: connectAccountData } = useQuery<{
    connectAccountStatus: ConnectedAccountStatus;
  }>(GET_CONNECT_ACCOUNT_STATUS, { fetchPolicy: 'network-only' });

  const [getConnectAccountStatus] = useLazyQuery<{
    connectAccountStatus: ConnectedAccountStatus;
  }>(GET_CONNECT_ACCOUNT_STATUS, { fetchPolicy: 'network-only' });

  const isCurrentArtistAccount =
    currentUser.id === artistData.artist.accountId;

  const hasLiveAuction = !!auctionData && !!auctionData.auction;

  const handleCloseDialog = async () => {
    onCloseDialog();

    await getConnectAccountStatus();
  };

  return (
    <HStack py={3} gap={4} items='center' justify='space-between'>
      <HStack gap={4} items='center'>
        <Heading weight={400} size={6} css={{ lineHeight: '115%' }}>
          {`${artistData.artist.name}'s`} Club Page
        </Heading>
        {hasLiveAuction && (
          <Center
            px={2}
            border={1}
            fontWeight={500}
            fontSize={2}
            borderColor='success500'
            color='success500'
            radius={1}
          >
            LIVE
          </Center>
        )}
      </HStack>
      <HStack gap={4}>
        {isCurrentArtistAccount ? (
          <Button
            variant='outline'
            css={{ px: '50px' }}
            colorTheme='purple50'
            onClick={() =>
              navigate(
                makePath([
                  Paths.clubs,
                  artistData.artist.username,
                  Paths.edit,
                  Paths.bio,
                ]),
                {
                  state: {
                    previousLocation: pathname,
                  },
                },
              )
            }
          >
            Edit
          </Button>
        ) : (
          <ArtistClubSocialButton username={artistData.artist.username} />
        )}
        <ArtistClubHeaderAuctionButton
          hasLiveAuction={hasLiveAuction}
          isCurrentArtistAccount={isCurrentArtistAccount}
          onCreate={() => {
            if (connectAccountData?.connectAccountStatus === 'Complete') {
              return navigate(
                makePath([
                  Paths.clubs,
                  artistData.artist.username,
                  Paths.auction,
                  Paths.create,
                  Paths.auctionDetails,
                ]),
                {
                  state: {
                    previousLocation: pathname,
                  },
                },
              );
            }

            openWith({
              title: 'Verification',
              description: `To create live auctions, we need to verify your identity`,
              cancelText: 'Back',
              actionText: 'Verify',
              onAction: async () => {
                onOpenDialog();
              },
            });
          }}
          onDelete={() => {
            openWith({
              title: 'Are you sure you want to Cancel?',
              description: `Are you sure you want to cancel your auction? This action cannot be undone.`,
              cancelText: 'Do not cancel',
              actionText: 'Yes, Cancel Auction',
              onAction: async () => {
                await deleteAuction(
                  auctionData.auction.id,
                  clubData.club.id,
                );
              },
            });
          }}
        />

        {isDialogOpen && (
          <OnboardingFormDialog
            isOpen={isDialogOpen}
            onOpen={onOpenDialog}
            onClose={handleCloseDialog}
          />
        )}
      </HStack>
    </HStack>
  );
}
ArtistClubHeader.displayName = 'ArtistClubHeader';

export default ArtistClubHeader;
