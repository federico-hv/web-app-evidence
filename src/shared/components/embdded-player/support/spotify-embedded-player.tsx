import { Fragment } from 'react';

interface SpotifyEmbeddedPlayerProps {
  id: string;
  variant?: 'normal' | 'compact';
}

function SpotifyEmbeddedPlayer({
  id,
  variant = 'compact',
}: SpotifyEmbeddedPlayerProps) {
  return (
    <Fragment>
      {variant === 'compact' && (
        <iframe
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
          width='100%'
          height='152'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      )}
      {variant === 'normal' && (
        <iframe
          style={{ borderRadius: '12px' }}
          src='https://open.spotify.com/embed/track/7LfB7FS5zlPdGktZUeKrL7?utm_source=generator'
          width='100%'
          height='352'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      )}
    </Fragment>
  );
}

SpotifyEmbeddedPlayer.displayName = 'SpotifyEmbeddedPlayer';

export default SpotifyEmbeddedPlayer;
