import { useQuery } from '@apollo/client';
import { VStack } from '@holdr-ui/react';
import { HeaderLayout } from '../../../layouts';
import { ConnectedAccount, Paths } from '../../../shared';
import { ConnectedAccountItem, Head, Error, Loader } from '../../../components';
import { GET_CONNECTED_ACCOUNTS } from '../../../lib';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from './root';

function ConnectedAccountSettingsPage() {
  const { data, loading, error } = useQuery<{
    connectedAccounts: ConnectedAccount[];
  }>(GET_CONNECTED_ACCOUNTS);

  return (
    <Error hasError={!!error}>
      <Head
        title='Connected accounts'
        description='See the accounts that you have connected to your Holdr account.'
        url={prefix(RootSettingsPath, Paths.setting.connected_accounts)}
      />
      <Loader loading={loading}>
        {data && (
          <HeaderLayout
            title='Connected accounts'
            backLink={prefix(RootSettingsPath, Paths.setting.security)}
          >
            <VStack>
              {data.connectedAccounts.map(({ provider, email }) => (
                <ConnectedAccountItem
                  key={provider}
                  provider={provider}
                  email={email}
                />
              ))}
            </VStack>
          </HeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
ConnectedAccountSettingsPage.displayName = 'ConnectedAccountSettingsPage';

export default ConnectedAccountSettingsPage;
