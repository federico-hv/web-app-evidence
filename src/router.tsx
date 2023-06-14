import { Routes, Route } from 'react-router';
import {
  NotFoundPage,
  HomePage,
  DiscoverPage,
  ReleasesPage,
  ChannelsPage,
  BookmarksPage,
  NotificationsPage,
  ProfilePage,
  SupportPage,
  SettingsPage,
  TwoFactorAuthSettingsPage,
  AccountSecuritySettingsPage,
  ConnectedAccountSettingsPage,
  AccountSettingsPage,
  ChangePasswordSettingPage,
  AccountInfoSettingsPage,
  SecuritySettingsPage,
  PrivacySettingsPage,
  NotificationsSettingsPage,
  ProtectAndTaggingSettingsPage,
  MuteAndBlockSettingsPage,
  MutedAccountsSettingsPage,
  BlockedAccountsSettingsPage,
  NotificationsPreferenceSettingsPage,
  NotificationsFilterSettingsPage,
  EmailFiltersSettingsPage,
  MutedNotificationsSettingsPage,
} from './pages';
import { MainLayout } from './layouts';
import { PathParams, Paths } from './shared';
import { AuthGuard, AuthRedirect } from './components';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* PROTECTED ROUTES - ANYONE */}
        <Route element={<AuthGuard />}>
          <Route path={Paths.channels} element={<ChannelsPage />} />
          <Route path={Paths.bookmarks} element={<BookmarksPage />} />
          <Route path={Paths.discover} element={<DiscoverPage />} />
          <Route path={Paths.releases} element={<ReleasesPage />} />
          <Route
            path={Paths.notifications}
            element={<NotificationsPage />}
          />
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
          </Route>
        </Route>
        {/* PROTECTED ROUTES - ARTISTS */}
        <Route element={<AuthGuard roles={['artist']} />}></Route>
        {/* PUBLIC ROUTES*/}
        <Route path={Paths.home} element={<HomePage />} />
        <Route path={PathParams.profileId} element={<ProfilePage />} />
        <Route path={Paths.support} element={<SupportPage />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* REDIRECTS */}
        <Route path={Paths.authRedirect} element={<AuthRedirect />} />
      </Route>
    </Routes>
  );
}

export default Router;
