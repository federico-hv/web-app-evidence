export interface ISpotifyImage {
  height: number;
  width: number;
  url: string;
}

export interface ISpotifySearchResult {
  name: string;
  id: string;
  url: string;
  images: ISpotifyImage[];
}
