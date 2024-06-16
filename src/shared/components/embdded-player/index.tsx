import { IExternalId, MusicReleaseProvider } from '../../../features';
import { Fragment } from 'react';
import { Box } from '@holdr-ui/react';
import { SpotifyEmbeddedPlayer } from './support';

interface EmbeddedPlayerProps {
  ids: IExternalId<number, MusicReleaseProvider>[];
  provider: MusicReleaseProvider;
}

function EmbeddedPlayer({ ids, provider }: EmbeddedPlayerProps) {
  const item = ids.find((item) => item.provider === provider);

  return (
    <Fragment>
      {provider === 'Spotify' && item && (
        <Box w={288}>
          <SpotifyEmbeddedPlayer id={item.externalId} />
        </Box>
      )}
    </Fragment>
  );
}
EmbeddedPlayer.displayName = 'EmbeddedPlayer';

export default EmbeddedPlayer;
