import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { CreateMembershipItem } from '../ui';
import {
  EmbeddedPlayer,
  makeButtonLarger,
  makePath,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
  useToast,
  voidFn,
} from '../../../../shared';
import { IExternalId, MusicReleaseProvider } from '../../../../features';
import { Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface EmbeddedPlaylistProps {
  ids: IExternalId<number, MusicReleaseProvider>[];
  provider: MusicReleaseProvider;
}

function extractSoundCloudPlaylistID(embedCode: string) {
  const regex = /playlists\/(\d+)/;
  const match = embedCode.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // or throw an error, or handle as you wish
  }
}

function extractSpotifyPlaylistID(embedCode: string) {
  const regex = /playlists\/(\d+)/;
  const match = embedCode.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // or throw an error, or handle as you wish
  }
}

const dummySoundCloudPlaylist: IExternalId<number, MusicReleaseProvider> =
  {
    id: 1,
    provider: 'Soundcloud',
    externalId:
      extractSoundCloudPlaylistID(
        '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1710937740&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/sc-playlists-ca" title="Discovery Playlists" target="_blank" style="color: #cccccc; text-decoration: none;">Discovery Playlists</a> · <a href="https://soundcloud.com/sc-playlists-ca/sets/party-warehouse" title="Party WareHouse" target="_blank" style="color: #cccccc; text-decoration: none;">Party WareHouse</a></div>',
      ) || '',
  };

const dummySpotifyPlaylist: IExternalId<number, MusicReleaseProvider> = {
  id: 1,
  provider: 'Soundcloud',
  externalId:
    extractSpotifyPlaylistID(
      '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
    ) || '',
};

function EmbeddedPlaylist({ ids, provider }: EmbeddedPlaylistProps) {
  const item = ids.find((item) => item.provider === provider);

  return (
    <Fragment>
      {provider === 'Soundcloud' && item && item.externalId && (
        <iframe
          width='100%'
          height='300'
          allow='autoplay'
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${item.externalId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
        />
      )}
      {provider === 'Spotify' && (
        <iframe
          style={{ borderRadius: '12px' }}
          src='https://open.spotify.com/embed/playlist/37i9dQZF1DWYmmr74INQlb?utm_source=generator'
          width='100%'
          height='352'
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      )}
    </Fragment>
  );
}

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
        <CreateMembershipItem
          text='Add Private Playlist'
          onClick={gotoPrivatePlaylistCreation}
        />
        <VStack>
          <VStack mb={6}>
            <HStack items='center' gap={4} mb={2}>
              <Heading size={6} weight={400}>
                Public Playlist
              </Heading>
              <IconButton
                onClick={gotoPrivatePlaylistCreation}
                size='sm'
                colorTheme='white100'
                icon='edit-fill'
                ariaLabel='edit '
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

        <VStack w='100%' as='section' gap={4}>
          <Heading size={6} weight={400}>
            Artist Picks
          </Heading>
          <HStack gap={6} w='100%'>
            <Box shrink={0} w='33%'>
              <EmbeddedPlayer
                variant='normal'
                provider='Spotify'
                ids={[
                  {
                    id: 0,
                    provider: 'Spotify',
                    externalId: '7LfB7FS5zlPdGktZUeKrL7',
                  },
                ]}
              />
            </Box>
            <Box w='33%'>
              <EmbeddedPlayer
                variant='normal'
                provider='Spotify'
                ids={[
                  {
                    id: 0,
                    provider: 'Spotify',
                    externalId: '7LfB7FS5zlPdGktZUeKrL7',
                  },
                ]}
              />
            </Box>
            <Box w='33%'>
              <EmbeddedPlayer
                variant='normal'
                provider='Spotify'
                ids={[
                  {
                    id: 0,
                    provider: 'Spotify',
                    externalId: '7LfB7FS5zlPdGktZUeKrL7',
                  },
                ]}
              />
            </Box>
          </HStack>
        </VStack>

        <CreateMembershipItem
          text='Add Public Playlist'
          onClick={gotoPublicPlaylistCreation}
        />
        <Box position='relative'>
          <HStack items='center' gap={4} mb={4}>
            <Heading size={6} weight={400}>
              Public Playlist
            </Heading>
            <IconButton
              onClick={gotoPublicPlaylistCreation}
              size='sm'
              colorTheme='white100'
              icon='edit-fill'
              ariaLabel='edit '
            />
          </HStack>
          <EmbeddedPlaylist
            ids={[dummySpotifyPlaylist]}
            provider='Spotify'
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default MembershipMusicPage;
