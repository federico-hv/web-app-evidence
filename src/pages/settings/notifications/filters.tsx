import { HeaderLayout } from 'layouts';
import { SettingButton } from 'components';
import { prefix } from '../../../utilities';
import { RootSettingsPath } from '../security/root';
import { Paths } from '../../../shared';

function NotificationsFilterSettingsPage() {
  return (
    <HeaderLayout title='Filters'>
      <SettingButton
        path={prefix(RootSettingsPath, Paths.setting.muted_notifications)}
        heading='Muted notifications'
      />
    </HeaderLayout>
  );
}
NotificationsFilterSettingsPage.displayName =
  'NotificationsFilterSettingsPage';

export default NotificationsFilterSettingsPage;
