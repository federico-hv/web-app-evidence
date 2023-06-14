import { Box } from '@holdr-ui/react';
import { PageHeader } from '../root';
import { Head, SettingButton } from 'components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function NotificationSettingsPage() {
  return (
    <>
      <Head
        title='Notifications'
        description=''
        url={prefix(RootSettingsPath, Paths.setting.notifications)}
      />
      <Box>
        <PageHeader title='Notifications' />
        <SettingButton
          path={prefix(
            RootSettingsPath,
            Paths.setting.notifications_filters,
          )}
          heading='Filters'
          subheading='Select your preferences by notification type.'
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
