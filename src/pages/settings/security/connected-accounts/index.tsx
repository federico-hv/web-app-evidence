import { useQuery } from '@apollo/client';
import { VStack } from '@holdr-ui/react';
import {
  GET_CONNECTED_ACCOUNTS,
  IConnectedAccount,
} from '../../../../features';
import { Error, Head, Loader, Paths, prefix } from '../../../../shared';
import { RootSettingsPath } from '../root';
import { ConnectedAccount } from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function ConnectedAccountSettingsPage() {
  const { data, loading, error } = useQuery<{
    connectedAccounts: IConnectedAccount[];
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
          <SettingsHeaderLayout
            title='Connected accounts'
            backLink={prefix(RootSettingsPath, Paths.setting.security)}
          >
            <VStack>
              {data.connectedAccounts.map(({ provider, email }) => (
                <ConnectedAccount
                  key={provider}
                  provider={provider}
                  email={email}
                />
              ))}
            </VStack>
          </SettingsHeaderLayout>
        )}
      </Loader>
    </Error>
  );
}
ConnectedAccountSettingsPage.displayName = 'ConnectedAccountSettingsPage';

export default ConnectedAccountSettingsPage;
