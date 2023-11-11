import { VStack } from '@holdr-ui/react';
import { ErrorFallback, Head, Paths, prefix } from '../../../../shared';
import { Fragment } from 'react';
import { RootSettingsPath } from '../root';

import SettingsHeaderLayout from '../../../../layout/settings-header';
import TwoFASmsCheckbox from './ui/two-fa-sms.checkbox';
import TwoFAAuthAppCheckbox from './ui/two-fa-auth-app.checkbox';
import GqlRenderer from '../../../../shared/components/gql-renderer';

function TwoFactorAuthSettingsPage() {
  return (
    <Fragment>
      <Head
        title='Two-factor authentication'
        description='Help protect your account from unauthorized access by
        requiring a second authentication method in addition to your Twitter
        password. You can choose a text message, authentication app, or security key'
        url={prefix(RootSettingsPath, Paths.setting.login_security)}
      />
      <SettingsHeaderLayout
        title='Two-factor authentication'
        backLink={prefix(RootSettingsPath, Paths.setting.account_security)}
      >
        <VStack pt={3} gap={4}>
          <TwoFASmsCheckbox />
          <GqlRenderer ErrorFallback={ErrorFallback}>
            <TwoFAAuthAppCheckbox />
          </GqlRenderer>
        </VStack>
      </SettingsHeaderLayout>
    </Fragment>
  );
}
TwoFactorAuthSettingsPage.displayName = 'TwoFactorAuthSettingsPage';

export default TwoFactorAuthSettingsPage;
