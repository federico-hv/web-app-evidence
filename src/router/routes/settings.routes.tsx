import { Route, Routes } from 'react-router';
import {
  SettingsAccountPage,
  SettingsNotificationsPage,
  SettingsPaymentsPage,
  SettingsPrivacyAndSafetyPage,
  SettingsTabs,
} from '../../pages';
import { Paths } from '../../shared';
import { Navigate } from 'react-router-dom';

const SettingsRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<SettingsTabs />}>
      <Route
        path={Paths.root}
        element={<Navigate replace to={Paths.setting.account} />}
      />
      <Route
        path={Paths.setting.account}
        element={<SettingsAccountPage />}
      />
      <Route
        path={Paths.setting.privacy}
        element={<SettingsPrivacyAndSafetyPage />}
      />
      <Route
        path={Paths.setting.notifications}
        element={<SettingsNotificationsPage />}
      />
      <Route
        path={Paths.setting.payments}
        element={<SettingsPaymentsPage />}
      />
    </Route>
  </Routes>
);

SettingsRoutes.displayName = 'SettingsRoutes';

export default SettingsRoutes;
