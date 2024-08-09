import { IExternalId, MusicReleaseProvider } from '../../../features';
import { Fragment } from 'react';
import { Box } from '@holdr-ui/react';
import { SpotifyEmbeddedPlayer } from './support';

interface EmbeddedPlayerProps {
  ids: IExternalId<number, MusicReleaseProvider>[];
  provider: MusicReleaseProvider;
  variant?: 'normal' | 'compact';
}

function EmbeddedPlayer({ ids, provider, variant }: EmbeddedPlayerProps) {
  const item = ids.find((item) => item.provider === provider);

  return (
    <Fragment>
      {provider === 'Spotify' && item && (
        <Box w='full'>
          <SpotifyEmbeddedPlayer variant={variant} id={item.externalId} />
        </Box>
      )}
    </Fragment>
  );
}
EmbeddedPlayer.displayName = 'EmbeddedPlayer';

export default EmbeddedPlayer;
