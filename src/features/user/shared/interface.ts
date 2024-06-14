export interface IExternalAccountModel {
  id: number;
  externalId: string;
  provider: string;
  url: string;
  username?: string;
  avatar?: string;
}
