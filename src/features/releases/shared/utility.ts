import { ConnectorProvider, IProviderItem } from './types';
import { Asset } from '../../../shared';

export class ConnectedAccountUtility {
  static providers = ['spotify', 'apple music'];

  static providerItem: Record<ConnectorProvider, IProviderItem> = {
    spotify: {
      image: Asset.Image.SpotifyLogo,
      name: 'Spotify',
    },
    'apple music': {
      image: Asset.Image.AppleMusicLogo,
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
