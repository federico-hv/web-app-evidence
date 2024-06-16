import { Box, Text } from '@holdr-ui/react';
import { IExternalId, MusicReleaseProvider } from '../../../../features';
import { LinkOverlay, makePath, Paths } from '../../../../shared';

interface FavoriteArtistProps {
  name: string;
  id?: string;
  externalIds: Array<
    IExternalId<number, MusicReleaseProvider> & { externalUrl: string }
  >;
}

function FavoriteArtist({ name, id, externalIds }: FavoriteArtistProps) {
  const spotifyItem = externalIds.find(
    (item) => item.provider === 'Spotify',
  );

  return (
    <Box
      position='relative'
      h='fit-content'
      w='fit-content'
      _hover={{
        '& > *': {
          textDecoration: 'underline',
        },
      }}
    >
      {(id || spotifyItem) && (
        <LinkOverlay
          target={id ? '_self' : '_blank'}
          to={
            id
              ? makePath([Paths.clubs, 'username'])
              : spotifyItem?.externalUrl
          }
        />
      )}
      <Text>{name}</Text>
    </Box>
  );
}
FavoriteArtist.displayName = 'FavoriteArtist';

export default FavoriteArtist;
