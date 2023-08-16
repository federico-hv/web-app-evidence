import { Box } from '@holdr-ui/react';
import { SettingItem } from '../../../../features';
import {
  Head,
  Paths,
  prefix,
  RootSettingsPath,
  useMenuNavigate,
} from '../../../../shared';
import { PageHeader } from '../../root';

function NotificationSettingsPage() {
  const { goto } = useMenuNavigate();
  return (
    <>
      <Head
        title='Notifications'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.notifications)}
      />
      <Box>
        <PageHeader title='Notifications' onBack={goto.settings} />
        <SettingItem
          path={prefix(
            RootSettingsPath,
            Paths.setting.notifications_filters,
          )}
          heading='Filters'
          subheading='Filter your notifications based on what you want to receive.'
          icon='settings-alt-outline'
        />
        <SettingItem
          path={prefix(
            RootSettingsPath,
            Paths.setting.notifications_preferences,
          )}
          heading='Preferences'
          subheading='Select your preferences by notification type.'
          icon='notification-alt-outline'
        />
      </Box>
    </>
  );
}
NotificationSettingsPage.displayName = 'NotificationSettingsPage';
export default NotificationSettingsPage;
