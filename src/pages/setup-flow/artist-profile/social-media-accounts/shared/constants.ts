import { SocialProvider } from '../../../../../features';
import { SocialURLName } from './types';

export const PlatformInfo: Record<
  SocialURLName,
  { name: SocialProvider; regExp: RegExp }
> = {
  instagramURL: {
    name: 'Instagram',
    regExp: /^https:\/\/(www\.)?instagram.com\/.+/,
  },
  tiktokURL: {
    name: 'TikTok',
    regExp: /^https:\/\/(www\.)?tiktok.com\/.+/,
  },
  xURL: {
    name: 'X',
    regExp: /^https:\/\/(www\.)?x.com\/.+/,
  },
};
