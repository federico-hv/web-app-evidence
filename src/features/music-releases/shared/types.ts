export interface ISpotifyImage {
  height: number;
  width: number;
  url: string;
}

export interface ISpotifyArtistResponse {
  name: string;
  id: string;
  url: string;
  images: ISpotifyImage[];
}

export interface ISpotifyTrackResponse {
  id: string;
  name: string;
  artists: string[];
  url: string;
  images: ISpotifyImage[];
}
