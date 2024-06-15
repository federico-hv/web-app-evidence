interface SpotifyEmbeddedPlayerProps {
  id: string;
}

function SpotifyEmbeddedPlayer({ id }: SpotifyEmbeddedPlayerProps) {
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
      width='100%'
      height='152'
      allowFullScreen
      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      loading='lazy'
    ></iframe>
  );
}
SpotifyEmbeddedPlayer.displayName = 'SpotifyEmbeddedPlayer';

export default SpotifyEmbeddedPlayer;
