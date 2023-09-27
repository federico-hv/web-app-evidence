import { Head, Paths, prefix, useMenuNavigate } from '../../../../shared';
import { Box } from '@holdr-ui/react';
import { SettingItem } from '../../../../features';
import { PageHeader } from '../../root';

function AccountSettingsPage() {
  const RootSettingsPath = `/${Paths.settings}/`;
  const { goto } = useMenuNavigate();
  return (
    <>
      <Head
        title='Your account'
        description='See information about your account, or learn about your account deactivation options.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <Box>
        <PageHeader title='Your account' onBack={goto.settings} />
        <SettingItem
          path={prefix(RootSettingsPath, Paths.setting.account_info)}
          icon='user-outline'
          heading='Account information'
          subheading='See account info like your phone number and email.'
        />
        <SettingItem
          path={prefix(RootSettingsPath, Paths.setting.change_password)}
          icon='lock-outline'
          heading='Change your password'
          subheading='Change your password at any time.'
        />
      </Box>
    </>
  );
}
AccountSettingsPage.displayName = 'AccountSettingsPage';
export default AccountSettingsPage;
