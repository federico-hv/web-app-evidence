import { Head, Paths, prefix, RootSettingsPath } from '../../../../shared';

import { SettingItem } from '../../../../features';
import { HeaderLayout } from '../../../../layout';

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
      <HeaderLayout
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
      </HeaderLayout>
    </>
  );
}
NotificationsPreferenceSettingsPage.displayName =
  'NotificationsPreferenceSettingsPage';

export default NotificationsPreferenceSettingsPage;
