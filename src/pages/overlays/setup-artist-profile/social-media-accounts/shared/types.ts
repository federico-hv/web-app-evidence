import { IExternalAccountModel } from '../../../../../features';
import { SocialProvider } from '../../../../../shared';

export type SocialURLName = 'Instagram' | 'X' | 'TikTok';

export interface ISocialAccounts {
  Instagram?: string;
  X?: string;
  TikTok?: string;
}

export interface ISocialLink {
  provider: SocialProvider;
  url: string;
}

export interface ISocialMediaAccountsViewContext {
  isDisabled: boolean;
  links: ISocialAccounts;
  externalAccount?: IExternalAccountModel;
}
