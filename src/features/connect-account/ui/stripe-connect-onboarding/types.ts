import { StripeConnectInstance } from '@stripe/connect-js';

export interface StripeConnectInstanceProps {
  onExit: VoidFunction;
  connectInstance: StripeConnectInstance;
}
