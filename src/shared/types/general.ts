export type AuthProviderName =
  | 'google'
  | 'spotify'
  | 'apple'
  | 'apple-music'
  | 'facebook';

export type SocialProviderName = 'spotify' | 'apple' | 'instagram';

export type Role = 'general' | 'artist';

export type GenericItem = { id: StringNumeric };

export type StringNumeric = string | number;
