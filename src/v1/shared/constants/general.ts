// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import googleLogo from '../../assets/images/google-logo.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import spotifyLogo from '../../assets/images/spotify-logo.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import appleLogo from '../../assets/images/apple-logo.png';
import { ProviderName } from '../types';
import { IProviderItem } from '../interfaces';

export const Provider: Record<ProviderName, IProviderItem> = {
  google: {
    image: googleLogo,
    name: 'Google',
  },
  spotify: {
    image: spotifyLogo,
    name: 'Spotify',
  },
  apple: {
    image: appleLogo,
    name: 'Apple',
  },
};

export const Age = {
  min: 18,
  max: 75,
};
