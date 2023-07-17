import { SettingItem } from '../../../features';
import {
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../shared';

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
        <SettingItem
          path={prefix(RootSettingsPath, Paths.setting.blocked_accounts)}
          heading='Blocked accounts'
        />
        <SettingItem
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
