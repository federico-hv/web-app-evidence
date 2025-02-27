export type ConnectorProvider = 'spotify' | 'apple music';

export interface IConnectedAccount {
  id: number;
  provider: ConnectorProvider;
  connectedOn: string;
}

export interface IProviderItem {
  name: string;
  image: string;
  ref: ConnectorProvider;
}
