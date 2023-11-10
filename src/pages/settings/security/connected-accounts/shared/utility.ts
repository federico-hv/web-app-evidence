import { ConnectorProvider, IProviderItem } from './types';
import spotifyLogo from '../../../../../assets/images/spotify-logo.png';
import appleMusicLogo from '../../../../../assets/images/apple-music-logo.png';

export class ConnectedAccountUtility {
  static providers = ['spotify', 'apple music'];

  static providerItem: Record<ConnectorProvider, IProviderItem> = {
    spotify: {
      image: spotifyLogo,
      name: 'Spotify',
    },
    'apple music': {
      image: appleMusicLogo,
      name: 'Apple Music',
    },
  };
  static getProviderItem(name: string): IProviderItem | null {
    if (this.providers.includes(name.toLowerCase())) {
      return this.providerItem[name as ConnectorProvider];
    }
    return null;
  }
}
