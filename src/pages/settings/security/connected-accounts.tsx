import { VStack } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { ConnectedAccount } from 'shared';
import { ConnectedAccountItem } from 'components';

function ConnectedAccountSettingsPage() {
  const connectedAccounts: Array<ConnectedAccount> = [
    { provider: 'google', email: 'jaz@gmail.com' },
  ];
  return (
    <HeaderLayout title='Account information'>
      <VStack>
        {connectedAccounts.map(({ provider, email }) => (
          <ConnectedAccountItem
            key={provider}
            provider={provider}
            email={email}
          />
        ))}
      </VStack>
    </HeaderLayout>
  );
}
ConnectedAccountSettingsPage.displayName = 'ConnectedAccountSettingsPage';

export default ConnectedAccountSettingsPage;
