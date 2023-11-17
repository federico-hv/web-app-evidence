import { ConnectorProvider } from '../../../connected-accounts';

export interface ConnectButtonProps {
  provider: ConnectorProvider;
  onClick: VoidFunction;
}
