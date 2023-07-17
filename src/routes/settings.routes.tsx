import { Route, Routes } from 'react-router';
import { NotFoundError, Paths } from '../shared';
import {
  AccountInfoSettingsPage,
  AccountSecuritySettingsPage,
  AccountSettingsPage,
  BackupCodeSettingsPage,
  BirthdaySettingPage,
  BlockedAccountsSettingsPage,
  ChangePasswordSettingPage,
  ConnectedAccountSettingsPage,
  CountrySettingPage,
  EmailFiltersSettingsPage,
  EmailSettingPage,
  GenderSettingPage,
  ManageUsersSettingsPage,
  MutedAccountsSettingsPage,
  MutedNotificationsSettingsPage,
  NotificationsFilterSettingsPage,
  NotificationsPreferenceSettingsPage,
  NotificationsSettingsPage,
  PhoneSettingPage,
  PrivacySettingsPage,
  ProtectAndTaggingSettingsPage,
  SecuritySettingsPage,
  SettingsPage,
  TwoFactorAuthSettingsPage,
  UsernameSettingPage,
} from '../pages/settings';
import { AccountInfoGuard } from '../features';

/**
 * Responsive:
 * Try removing the SettingsPage from the root Route react
 * and see what happens => the rest of the content will be rendered:
 *
 * 1) Will need a settings page ->  display all setting options
 * 2) Possibly add a wrapper that adds the appropriate padding-top
 */

const SettingsRoutes = () => (
  <Routes>
    <Route path='' element={<SettingsPage />}>
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
      <Route
        path={Paths.setting.protection_and_tagging}
        element={<ProtectAndTaggingSettingsPage />}
      />
      <Route
        path={Paths.setting.manage_users}
        element={<ManageUsersSettingsPage />}
      />
      <Route
        path={Paths.setting.backup_code}
        element={<BackupCodeSettingsPage />}
      />
      <Route
        path={Paths.setting.muted_accounts}
        element={<MutedAccountsSettingsPage />}
      />
      <Route
        path={Paths.setting.blocked_accounts}
        element={<BlockedAccountsSettingsPage />}
      />
      <Route
        path={Paths.setting.notifications_filters}
        element={<NotificationsFilterSettingsPage />}
      />
      <Route
        path={Paths.setting.notifications_preferences}
        element={<NotificationsPreferenceSettingsPage />}
      />
      <Route
        path={Paths.setting.email_notifications}
        element={<EmailFiltersSettingsPage />}
      />

      <Route
        path={Paths.setting.muted_notifications}
        element={<MutedNotificationsSettingsPage />}
      />
      {/* Account info settings are password protected.*/}
      <Route element={<AccountInfoGuard />}>
        <Route
          path={Paths.setting.account_info}
          element={<AccountInfoSettingsPage />}
        />
        <Route
          path={Paths.setting.username}
          element={<UsernameSettingPage />}
        />
        <Route path={Paths.setting.phone} element={<PhoneSettingPage />} />
        <Route path={Paths.setting.email} element={<EmailSettingPage />} />
        <Route
          path={Paths.setting.country}
          element={<CountrySettingPage />}
        />
        <Route
          path={Paths.setting.gender}
          element={<GenderSettingPage />}
        />
        <Route
          path={Paths.setting.birthday}
          element={<BirthdaySettingPage />}
        />
      </Route>
    </Route>
    <Route path='*' element={<NotFoundError />} />
  </Routes>
);

SettingsRoutes.displayName = 'SettingsRoutes';

export default SettingsRoutes;
