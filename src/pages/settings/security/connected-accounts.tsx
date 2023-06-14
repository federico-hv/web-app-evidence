import { VStack } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { ConnectedAccount, Paths } from 'shared';
import { ConnectedAccountItem, Head } from 'components';

function ConnectedAccountSettingsPage() {
  const connectedAccounts: Array<ConnectedAccount> = [
    { provider: 'google', email: 'jaz@gmail.com' },
  ];
  return (
    <>
      <Head
        title='Connected accounts'
        description='See the accounts that you have connected to your Holdr account.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <HeaderLayout title='Connected accounts'>
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
    </>
  );
}
ConnectedAccountSettingsPage.displayName = 'ConnectedAccountSettingsPage';

export default ConnectedAccountSettingsPage;
