import { socialProvider } from '../constants';
import { IExternalId, MusicReleaseProvider } from '../../features';

export type SocialProviderName = 'spotify' | 'apple' | 'instagram';

export type Role = 'general' | 'artist';

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;

export type ProcessActionType = 'manual' | 'auto';

export type SocialProvider = (typeof socialProvider)[number];

export interface ISocialLink {
  url: string;
  provider: SocialProvider;
}

export interface ITinyArtist<T = string> {
  id: T;
  name: string;
  image: string;
  artistId?: string;
  externalIds: Array<
    IExternalId<number, MusicReleaseProvider> & { externalUrl: string }
  >;
}
