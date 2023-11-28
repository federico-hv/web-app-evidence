import { VStack } from '@holdr-ui/react';
import { ErrorFallback, Head, Paths, prefix } from '../../../../shared';
import { RootSettingsPath } from '../root';
import { useConnectedAccounts } from '../../../../features';
import { ConnectedAccount } from './ui';
import SettingsHeaderLayout from '../../../../layout/settings-header';
import GqlRenderer from '../../../../shared/components/gql-renderer';
import { Fragment } from 'react';

function ConnectedAccountSettingsPage() {
  return (
    <Fragment>
      <Head
        title='Connected accounts'
        description='See the accounts that you have connected to your Holdr account.'
        url={prefix(RootSettingsPath, Paths.setting.connected_accounts)}
      />
      <SettingsHeaderLayout
        title='Connected accounts'
        backLink={prefix(RootSettingsPath, Paths.setting.security)}
      >
        <GqlRenderer ErrorFallback={ErrorFallback}>
          <Content />
        </GqlRenderer>
      </SettingsHeaderLayout>
    </Fragment>
  );
}

function Content() {
  const connectedAccounts = useConnectedAccounts();

  return (
    <VStack>
      {connectedAccounts.edges.map(({ node, cursor }) => (
        <ConnectedAccount key={cursor} {...node} />
      ))}
    </VStack>
  );
}

ConnectedAccountSettingsPage.displayName = 'ConnectedAccountSettingsPage';

export default ConnectedAccountSettingsPage;
