export function extractSoundCloudPlaylistID(embedCode: string) {
  const regex = /playlists\/(\d+)/;
  const match = embedCode.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // or throw an error, or handle as you wish
  }
}

export function extractSpotifyPlaylistID(embedCode: string) {
  const regex = /playlists\/(\d+)/;
  const match = embedCode.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // or throw an error, or handle as you wish
  }
}
