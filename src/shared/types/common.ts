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

export interface ISuccessResponse<T = any> {
  data?: T;
  isSuccess: boolean;
  status: number;
  message: string;
}

export interface IDataSuccessResponse<T = any> {
  data: T;
  isSuccess: boolean;
  status: number;
  message: string;
}

export interface ILengthErrorExists {
  length: number;
  message?: string;
}

export type ICompareErrorExists =
  | {
      fn: boolean; // must be true to trigger fn
      message?: {
        gt?: string;
        lt?: string;
        fn?: string;
      };
      value?: never;
      gt?: never;
      lt?: never;
    }
  | {
      fn?: never;
      value: StringNumeric;
      gt?: StringNumeric;
      lt?: StringNumeric;
      message?: {
        gt?: string;
        lt?: string;
        fn?: string;
      };
    };

export interface PasswordErrors {
  capital?: boolean;
  lowercase?: boolean;
  special?: boolean;
  number?: boolean;
  length?: boolean;
}
