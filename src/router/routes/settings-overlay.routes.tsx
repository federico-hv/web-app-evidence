import { Route, Routes } from 'react-router';
import { makePath, Paths } from '../../shared';
import {
  ChangeEmailPage,
  ChangePasswordPage,
  ChangePhoneNumberPage,
  Setup2FAPage,
  SettingsDialog,
  BlockedAccountsPage,
  MutedAccountsPage,
} from '../../pages';

const SettingsOverlayRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<SettingsDialog />}>
      <Route
        path={makePath([
          Paths.setting.account,
          Paths.setting.change_email,
        ])}
      >
        <Route path={Paths.root} element={<ChangeEmailPage />} />
      </Route>
      <Route
        path={makePath([
          Paths.setting.account,
          Paths.setting.change_phone_number,
        ])}
      >
        <Route path={Paths.root} element={<ChangePhoneNumberPage />} />
      </Route>
      <Route
        path={makePath([
          Paths.setting.account,
          Paths.setting.change_password,
        ])}
      >
        <Route path={Paths.root} element={<ChangePasswordPage />} />
      </Route>
      <Route
        path={makePath([Paths.setting.privacy, Paths.setting.setup_2fa])}
      >
        <Route path={Paths.root} element={<Setup2FAPage />} />
      </Route>
      <Route
        path={makePath([
          Paths.setting.privacy,
          Paths.setting.blocked_accounts,
        ])}
      >
        <Route path={Paths.root} element={<BlockedAccountsPage />} />
      </Route>
      <Route
        path={makePath([
          Paths.setting.privacy,
          Paths.setting.muted_accounts,
        ])}
      >
        <Route path={Paths.root} element={<MutedAccountsPage />} />
      </Route>
    </Route>
  </Routes>
);

SettingsOverlayRoutes.displayName = 'SettingsOverlayRoutes';

export default SettingsOverlayRoutes;
