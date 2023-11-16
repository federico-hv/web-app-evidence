import {
  ConnectorProvider,
  IProviderItem,
} from '../../../connected-accounts';
import { Asset } from '../../../../shared';

export class ReleasesUtility {
  static providers = ['spotify', 'apple music'];

  static providerItem: Record<ConnectorProvider, IProviderItem> = {
    spotify: {
      image: Asset.Image.SpotifyLogo,
      name: 'Spotify',
      ref: 'spotify',
    },
    'apple music': {
      image: Asset.Image.AppleMusicLogo,
      name: 'Apple Music',
      ref: 'apple music',
    },
  };
  static getProviderItem(name: string): IProviderItem | null {
    if (this.providers.includes(name.toLowerCase())) {
      return this.providerItem[name as ConnectorProvider];
    }
    return null;
  }
}
