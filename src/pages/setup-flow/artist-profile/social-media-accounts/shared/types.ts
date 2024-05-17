import { IExternalAccount, SocialProvider } from '../../../../../features';

export type SocialURLName = 'instagramURL' | 'xURL' | 'tiktokURL';

export interface ISocialAccounts {
  instagramURL?: string;
  xURL?: string;
  tiktokURL?: string;
}

export interface ISocialLink {
  provider: SocialProvider;
  url: string;
}

export interface ISocialMediaAccountsViewContext {
  isDisabled: boolean;
  links: ISocialAccounts;
  externalAccount?: IExternalAccount;
}
