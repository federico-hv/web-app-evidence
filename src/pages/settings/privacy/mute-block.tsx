import { HeaderLayout } from 'layouts';
import { Head, SettingButton } from 'components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function MuteAndBlockSettingsPage() {
  return (
    <>
      <Head
        title='Mute and block'
        description='Manage the notifications that you receive and how your receive them.'
        url={`${Paths.settings}/${Paths.setting.account_info}`}
      />
      <HeaderLayout title='Mute and block'>
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.blocked_accounts)}
          heading='Blocked accounts'
        />
        <SettingButton
          path={prefix(RootSettingsPath, Paths.setting.muted_accounts)}
          heading='Muted accounts'
        />
      </HeaderLayout>
    </>
  );
}
MuteAndBlockSettingsPage.displayName = 'MuteAndBlockSettingsPage';

export default MuteAndBlockSettingsPage;
