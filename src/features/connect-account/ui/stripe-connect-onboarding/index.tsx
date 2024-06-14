import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';
import { StripeConnectInstanceProps } from './types';

function StripeConnectOnboarding({
  connectInstance,
  onExit,
}: StripeConnectInstanceProps) {
  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      <ConnectAccountOnboarding
        onExit={onExit}
        collectionOptions={{
          fields: 'eventually_due',
          futureRequirements: 'include',
        }}
        fullTermsOfServiceUrl='https://stripe.com'
        recipientTermsOfServiceUrl='https://stripe.com'
        privacyPolicyUrl='https://stripe.com'
        // skipTermsOfServiceCollection={false}
      />
    </ConnectComponentsProvider>
  );
}

export default StripeConnectOnboarding;
