import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';

import { SettingItem } from '../../../../features';
import SettingsHeaderLayout from '../../../../layout/settings-header';

function NotificationsPreferenceSettingsPage() {
  return (
    <>
      <Head
        title='Preferences'
        description='Select your preferences by notification type.'
        url={prefix(
          RootSettingsPath,
          Paths.setting.notifications_preferences,
        )}
      />
      <SettingsHeaderLayout
        title='Preferences'
        backLink={prefix(RootSettingsPath, Paths.setting.notifications)}
      >
        <SettingItem
          path={prefix(
            RootSettingsPath,
            Paths.setting.email_notifications,
          )}
          heading='Email notifications'
        />
      </SettingsHeaderLayout>
    </>
  );
}
NotificationsPreferenceSettingsPage.displayName =
  'NotificationsPreferenceSettingsPage';

export default NotificationsPreferenceSettingsPage;
