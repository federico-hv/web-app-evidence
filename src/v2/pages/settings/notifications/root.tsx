import { Box } from '@holdr-ui/react';
import { PageHeader } from '../root';
import { Head, SettingButton } from '../../../components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';
import { useMenuNavigate } from '../../../hooks';

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
        <SettingButton
          path={prefix(
            RootSettingsPath,
            Paths.setting.notifications_filters,
          )}
          heading='Filters'
          subheading='Filter your notifications based on what you want to receive.'
          icon='settings-alt-outline'
        />
        <SettingButton
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
