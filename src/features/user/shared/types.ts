import { ISocialLink, ITinyArtist } from '../../../shared';

export interface ProfileFormData {
  displayName: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
}

export interface IExternalId<T = string, U = string> {
  id: T;
  provider: U;
  externalId: string;
  externalUrl?: string;
}

export type MusicReleaseProvider = 'Spotify';

export interface IMusicRelease {
  id: number;
  name: string;
  artists: string;
  coverImage: string;
  externalIds: IExternalId<number, MusicReleaseProvider>[];
}

export type ISaveMusicRelease = {
  name: string;
  artists: string;
  coverImage: string;
  externalIds: Array<
    Omit<IExternalId<number, MusicReleaseProvider>, 'id'>
  >;
};

export type ISaveFavoriteArtist = {
  name: string;
  image: string;
  externalIds: Array<
    Omit<IExternalId<number, MusicReleaseProvider>, 'id'> & {
      externalUrl: string;
    }
  >;
};

export interface IProfile {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  protected: boolean;
  location?: string;
  favoriteSong: IMusicRelease | null;
  favoriteArtists: ITinyArtist<number>[];
  socialLinks: ISocialLink[];
}

export interface ITinyProfile {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

export interface IUpdateSocialLink {
  X?: string;
  Instagram?: string;
  TikTok?: string;
}
