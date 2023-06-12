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
} from 'pages';
import { MainLayout } from 'layouts';
import { PathParams, Paths } from 'shared';
import { AuthGuard, AuthRedirect } from 'components';

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
          <Route path={Paths.settings} element={<SettingsPage />} />
          <Route
            path={Paths.notifications}
            element={<NotificationsPage />}
          />
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
