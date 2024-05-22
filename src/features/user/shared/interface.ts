export interface IExternalAccount {
  id: number;
  externalId: string;
  provider: string;
  url: string;
  username?: string;
  avatar?: string;
}
