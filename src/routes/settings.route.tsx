import { Route, Routes } from 'react-router';
import { Paths } from 'shared';
import { AccountInfoGuard } from 'components';
import {
  AccountInfoSettingsPage,
  AccountSecuritySettingsPage,
  AccountSettingsPage,
  BlockedAccountsSettingsPage,
  ChangePasswordSettingPage,
  ConnectedAccountSettingsPage,
  CountrySettingPage,
  EmailFiltersSettingsPage,
  EmailSettingPage,
  GenderSettingPage,
  MuteAndBlockSettingsPage,
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
} from '../pages';
import BirthdaySettingPage from '../pages/settings/account/birthday';

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
        path={Paths.setting.mute_and_block}
        element={<MuteAndBlockSettingsPage />}
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
  </Routes>
);

SettingsRoutes.displayName = 'SettingsRoutes';

export default SettingsRoutes;
