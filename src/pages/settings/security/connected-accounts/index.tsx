import { useQuery } from '@apollo/client';
import { VStack } from '@holdr-ui/react';
import {
  Error,
  Head,
  IConnection,
  IPaginationParams,
  Loader,
  Paths,
  prefix,
} from '../../../../shared';
import { RootSettingsPath } from '../root';
import { GET_CONNECTED_ACCOUNTS } from './queries';
import { ConnectedAccount } from './ui';
import SettingsHeaderLayout from '../../../../layout/settings-header';
import { IConnectedAccount } from '../../../../features';

function ConnectedAccountSettingsPage() {
  const { data, loading, error } = useQuery<
    {
      connectedAccounts: IConnection<IConnectedAccount, number>;
    },
    { params?: IPaginationParams<number> }
  >(GET_CONNECTED_ACCOUNTS);

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
              {data.connectedAccounts.edges.map(({ node, cursor }) => (
                <ConnectedAccount key={cursor} {...node} />
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
