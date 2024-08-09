import { IExternalId, MusicReleaseProvider } from '../../../features';
import { Fragment } from 'react';

interface EmbeddedPlaylistProps {
  ids: IExternalId<number, MusicReleaseProvider>[];
  provider: MusicReleaseProvider;
}

function EmbeddedPlaylist({ ids, provider }: EmbeddedPlaylistProps) {
  const item = ids.find((item) => item.provider === provider);

  console.log(provider, item);

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

export default EmbeddedPlaylist;
