import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { ArtistEditItemButton, CreateMembershipItem } from '../ui';
import {
  EmbeddedPlayer,
  EmbeddedPlaylist,
  makeButtonLarger,
  makePath,
  useNavigateWithPreviousLocation,
  useToast,
} from '../../../../shared';
import { useLocation, useParams } from 'react-router-dom';
import { dummySoundCloudPlaylist, dummySpotifyPlaylist } from './shared';
import { FlatList } from '../../../../tmp/flat-list';
import { IExternalId, MusicReleaseProvider } from '../../../../features';

const hasPrivatePlaylist = true;
const hasPublicPlaylist = true;
const isSpotifyPlaylist = false;
const hasArtistPicks = true;

function MembershipMusicPage() {
  const { slug } = useParams();

  const { openWith } = useToast();

  const location = useLocation();
  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const gotoPrivatePlaylistCreation = () =>
    navigate(
      makePath(['memberships', slug ?? '', 'add', 'playlist', 'private']),
    );

  const gotoPublicPlaylistCreation = () =>
    navigate(
      makePath(['memberships', slug ?? '', 'add', 'playlist', 'public']),
    );

  return (
    <Container maxWidth={1280}>
      <VStack
        w='full'
        pb={10}
        css={{
          gap: '56px',
        }}
      >
        {!hasPrivatePlaylist ? (
          <CreateMembershipItem
            text='Add Private Playlist'
            onClick={gotoPrivatePlaylistCreation}
          />
        ) : (
          <VStack>
            <VStack mb={6}>
              <HStack items='center' gap={4} mb={2}>
                <Heading size={6} weight={400}>
                  Private Playlist
                </Heading>
                <ArtistEditItemButton
                  onClick={gotoPrivatePlaylistCreation}
                />
              </HStack>
              <Text>
                Get access to exclusive tracks and early releases before
                anyone else. Be the first to hear new songs, dive into
                behind-the-scenes content, and enjoy special surprises just
                for you!
              </Text>
            </VStack>
            <Button
              onClick={() =>
                openWith({
                  duration: 5000,
                  title: 'Request Sent Successfully',
                  status: 'success',
                  description:
                    'Your request has been sent to the artist. Expect to have access within 1-2 business days.',
                })
              }
              radius={1}
              colorTheme='purple500'
              className={makeButtonLarger('2.75rem')}
              css={{ px: '$4' }}
            >
              Get Access
            </Button>
          </VStack>
        )}

        {hasArtistPicks && (
          <VStack w='100%' as='section' gap={4}>
            <Heading size={6} weight={400}>
              Artist Picks
            </Heading>
            <FlatList
              gap={6}
              data={[
                {
                  id: 0,
                  provider: 'Spotify',
                  externalId: '0fTh0dLDH8aTt26xVxsiVp',
                },
                {
                  id: 1,
                  provider: 'Spotify',
                  externalId: '2bGbWQwWJ6EjLUas1tCWTK',
                },
                {
                  id: 2,
                  provider: 'Spotify',
                  externalId: '46Vo3Oxtc4aV4y1yf6ZTrt',
                },
              ]}
              renderItem={(item) => (
                <EmbeddedPlayer
                  variant='normal'
                  provider='Spotify'
                  ids={[item as IExternalId<number, MusicReleaseProvider>]}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </VStack>
        )}

        {!hasPublicPlaylist ? (
          <CreateMembershipItem
            text='Add Public Playlist'
            onClick={gotoPublicPlaylistCreation}
          />
        ) : (
          <Box position='relative'>
            <HStack items='center' gap={4} mb={4}>
              <Heading size={6} weight={400}>
                Public Playlist
              </Heading>
              <ArtistEditItemButton onClick={gotoPublicPlaylistCreation} />
            </HStack>
            <EmbeddedPlaylist
              ids={[dummySpotifyPlaylist, dummySoundCloudPlaylist]}
              provider={isSpotifyPlaylist ? 'Spotify' : 'Soundcloud'}
            />
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default MembershipMusicPage;
