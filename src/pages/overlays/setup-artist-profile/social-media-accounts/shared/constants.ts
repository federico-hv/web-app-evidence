import { SocialProvider } from '../../../../../shared';

export const SocialPlatformInfo: Record<
  SocialProvider,
  { name: SocialProvider; regExp: RegExp }
> = {
  Instagram: {
    name: 'Instagram',
    regExp: /^https:\/\/(www\.)?instagram.com\/.+/,
  },
  TikTok: {
    name: 'TikTok',
    regExp: /^https:\/\/(www\.)?tiktok.com\/.+/,
  },
  X: {
    name: 'X',
    regExp: /^https:\/\/(www\.)?x.com\/.+/,
  },
};
