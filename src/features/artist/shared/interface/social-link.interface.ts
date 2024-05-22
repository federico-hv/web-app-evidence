import { socialProvider } from '../constants';

export type SocialProvider = (typeof socialProvider)[number];

export interface ISocialLink {
  url: string;
  provider: SocialProvider;
}
