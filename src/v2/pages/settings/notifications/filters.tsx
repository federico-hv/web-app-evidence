import { HeaderLayout } from '../../../layouts';
import { Head, SettingButton } from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function NotificationsFilterSettingsPage() {
  return (
    <>
      <Head
        title='Filters'
        description='Filter your notifications based on what you want to receive.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout
        title='Filters'
        backLink={prefix(RootSettingsPath, Paths.setting.notifications)}
      >
        <SettingButton
          path={prefix(
            RootSettingsPath,
            Paths.setting.muted_notifications,
          )}
          heading='Muted notifications'
        />
      </HeaderLayout>
    </>
  );
}
NotificationsFilterSettingsPage.displayName =
  'NotificationsFilterSettingsPage';

export default NotificationsFilterSettingsPage;
