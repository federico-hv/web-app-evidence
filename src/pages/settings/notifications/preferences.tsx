import { HeaderLayout } from 'layouts';
import { Head, SettingButton } from 'components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function NotificationsPreferenceSettingsPage() {
  return (
    <>
      <Head
        title='Preferences'
        description='Select your preferences by notification type.'
        url={prefix(RootSettingsPath, Paths.setting.privacy)}
      />
      <HeaderLayout title='Preferences'>
        <SettingButton
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
