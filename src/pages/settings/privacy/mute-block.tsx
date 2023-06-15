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
        url={prefix(RootSettingsPath, Paths.setting.mute_and_block)}
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
      </HeaderLayout>
    </>
  );
}
MuteAndBlockSettingsPage.displayName = 'MuteAndBlockSettingsPage';

export default MuteAndBlockSettingsPage;
