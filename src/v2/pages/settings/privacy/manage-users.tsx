import { HeaderLayout } from '../../../layouts';
import { Head, SettingButton } from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function ManageUsersSettingsPage() {
  return (
    <>
      <Head
        title='Mute and block'
        description='Manage the notifications that you receive and how your receive them.'
        url={prefix(RootSettingsPath, Paths.setting.manage_users)}
      />
      <HeaderLayout
        title='Mute and block'
        backLink={prefix(RootSettingsPath, Paths.setting.privacy)}
      >
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.blocked_accounts)}
          heading='Blocked accounts'
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.muted_accounts)}
          heading='Muted accounts'
        />
        {/*<SettingButton*/}
        {/*  path={prefix(*/}
        {/*    RootSettingsPath,*/}
        {/*    Paths.setting.restricted_accounts,*/}
        {/*  )}*/}
        {/*  heading='Restricted accounts'*/}
        {/*/>*/}
      </HeaderLayout>
    </>
  );
}
ManageUsersSettingsPage.displayName = 'ManageUsersSettingsPage';

export default ManageUsersSettingsPage;
