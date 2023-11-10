export type ConnectorProvider = 'spotify' | 'apple music';

export interface IConnectedAccount {
  provider: ConnectorProvider;
  connectedOn: string;
}

export interface IProviderItem {
  name: string;
  image: string;
}
