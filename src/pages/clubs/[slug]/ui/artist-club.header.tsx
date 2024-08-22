import { Button, Center, Heading, HStack } from '@holdr-ui/react';
import {
  useCurrentUser,
  useDeleteAuction,
  useGetAuctionSuspenseQuery,
  useSuspenseGetArtist,
  useSuspenseGetClub,
} from '../../../../features';
import ArtistClubSocialButton from './artist-club-social.button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makePath, Paths, useAlertDialog } from '../../../../shared';

function ArtistClubHeader() {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  const { deleteAuction } = useDeleteAuction();

  const { openWith } = useAlertDialog();

  const { pathname } = useLocation();

  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug: slug || '' });

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
    {
      fetchPolicy: 'network-only',
    },
  );

  const isCurrentArtistAccount =
    currentUser.id === artistData.artist.accountId;

  return (
    <HStack py={3} gap={4} items='center' justify='space-between'>
      <HStack gap={4} items='center'>
        <Heading weight={400} size={6} css={{ lineHeight: '115%' }}>
          {`${artistData.artist.name}'s`} Club Page
        </Heading>
        {auctionData && auctionData.auction && (
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
        {currentUser.id === artistData.artist.accountId ? (
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
        {!auctionData.auction && isCurrentArtistAccount && (
          <Button
            css={{ px: '50px' }}
            colorTheme='purple100'
            onClick={() => {
              navigate(
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
            }}
          >
            Start Auction
          </Button>
        )}
        {isCurrentArtistAccount && auctionData && auctionData.auction && (
          <Button
            colorTheme='danger200'
            variant='outline'
            css={{
              px: '20px',
            }}
            onClick={() => {
              openWith({
                title: 'Are you sure you want to Cancel?',
                description: `Are you sure you want to cancel your auction? This action cannot be undone.`,
                cancelText: 'Do not cancel',
                actionText: 'Yes, Cancel Auction',
                onAction: async () =>
                  await deleteAuction(
                    auctionData.auction.id,
                    clubData.club.id,
                  ),
              });
            }}
          >
            Cancel Auction
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
ArtistClubHeader.displayName = 'ArtistClubHeader';

export default ArtistClubHeader;
