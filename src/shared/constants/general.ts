import googleLogo from '../../assets/images/google-logo.png';
import spotifyLogo from '../../assets/images/spotify-logo.png';
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
