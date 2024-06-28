import { Button, Center, Heading, HStack } from '@holdr-ui/react';
import {
  useCurrentUser,
  useSuspenseGetArtist,
} from '../../../../features';
import ArtistClubSocialButton from './artist-club-social.button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { makePath, Paths } from '../../../../shared';

function ArtistClubHeader() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  return (
    <HStack py={3} gap={4} items='center' justify='space-between'>
      <HStack gap={4} items='center'>
        <Heading weight={400} size={6} css={{ lineHeight: '115%' }}>
          {`${artistData.artist.name}'s`} Club Page
        </Heading>
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
        {currentUser.id === artistData.artist.accountId && (
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
            Create Auction
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
ArtistClubHeader.displayName = 'ArtistClubHeader';

export default ArtistClubHeader;
