import { Box } from '@holdr-ui/react';
import { prefix } from '../../../utilities';
import { Paths } from '../../../shared';
import { Head, SettingButton } from '../../../components';
import { PageHeader } from '../root';
import { useMenuNavigate } from '../../../hooks';

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
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.account_info)}
          icon='user-outline'
          heading='Account information'
          subheading='See account info like your phone number and email.'
        />
        <SettingButton
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
