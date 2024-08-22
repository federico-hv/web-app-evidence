import { Route, Routes } from 'react-router';
import { makePath, Paths } from '../../shared';
import {
  ChangeEmailPage,
  ChangePasswordPage,
  ChangePhoneNumberPage,
  Setup2FAPage,
  BlockedAccountsPage,
  MutedAccountsPage,
  SettingsDialog,
  TwFARecoveryCodePage,
} from '../../pages';

const SettingsOverlayRoutes = () => (
  <Routes>
    <Route
      path={makePath([Paths.setting.account])}
      element={<SettingsDialog />}
    >
      <Route
        path={Paths.setting.change_email}
        element={<ChangeEmailPage />}
      />
      <Route
        path={Paths.setting.change_phone_number}
        element={<ChangePhoneNumberPage />}
      />
      <Route
        path={Paths.setting.change_password}
        element={<ChangePasswordPage />}
      />
    </Route>

    <Route
      path={makePath([Paths.setting.privacy])}
      element={<SettingsDialog />}
    >
      <Route path={Paths.setting.setup_2fa} element={<Setup2FAPage />} />
      <Route
        path={Paths.setting.two_fa_recovery_code}
        element={<TwFARecoveryCodePage />}
      />
      <Route
        path={Paths.setting.blocked_accounts}
        element={<BlockedAccountsPage />}
      />
      <Route
        path={Paths.setting.muted_accounts}
        element={<MutedAccountsPage />}
      />
    </Route>
    <Route path={Paths.all} />
  </Routes>
);

SettingsOverlayRoutes.displayName = 'SettingsOverlayRoutes';

export default SettingsOverlayRoutes;
