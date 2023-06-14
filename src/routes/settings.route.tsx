import { Route } from 'react-router';
import { Paths } from '../shared';
import {
  AccountInfoSettingsPage,
  AccountSecuritySettingsPage,
  AccountSettingsPage,
  ChangePasswordSettingPage,
  ConnectedAccountSettingsPage,
  NotificationsSettingsPage,
  PrivacySettingsPage,
  SecuritySettingsPage,
  SettingsPage,
  TwoFactorAuthSettingsPage,
} from '../pages';

export function SettingsRoutes() {
  return (
    <Route path={Paths.settings} element={<SettingsPage />}>
      <Route
        path={Paths.setting.login_security}
        element={<TwoFactorAuthSettingsPage />}
      />
      <Route
        path={Paths.setting.account_security}
        element={<AccountSecuritySettingsPage />}
      />
      <Route
        path={Paths.setting.connected_accounts}
        element={<ConnectedAccountSettingsPage />}
      />
      <Route
        path={Paths.setting.account}
        element={<AccountSettingsPage />}
      />
      <Route
        path={Paths.setting.change_password}
        element={<ChangePasswordSettingPage />}
      />
      <Route
        path={Paths.setting.account_info}
        element={<AccountInfoSettingsPage />}
      />
      <Route
        path={Paths.setting.security}
        element={<SecuritySettingsPage />}
      />
      <Route
        path={Paths.setting.privacy}
        element={<PrivacySettingsPage />}
      />
      <Route
        path={Paths.setting.notifications}
        element={<NotificationsSettingsPage />}
      />
    </Route>
  );
}
SettingsRoutes.displayName = 'SettingsRoutes';

export default SettingsRoutes;
