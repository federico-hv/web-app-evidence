import { SettingItem } from '../../../../features';
import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function NotificationsFilterSettingsPage() {
  return (
    <>
      <Head
        title='Filters'
        description='Filter your notifications based on what you want to receive.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <SettingsHeaderLayout
        title='Filters'
        backLink={prefix(RootSettingsPath, Paths.setting.notifications)}
      >
        <SettingItem
          path={prefix(
            RootSettingsPath,
            Paths.setting.muted_notifications,
          )}
          heading='Muted notifications'
        />
      </SettingsHeaderLayout>
    </>
  );
}
NotificationsFilterSettingsPage.displayName =
  'NotificationsFilterSettingsPage';

export default NotificationsFilterSettingsPage;
