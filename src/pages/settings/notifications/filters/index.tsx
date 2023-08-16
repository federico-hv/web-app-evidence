import { SettingItem } from '../../../../features';
import {
  Head,
  HeaderLayout,
  Paths,
  prefix,
  RootSettingsPath,
} from '../../../../shared';

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
        <SettingItem
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
