import { Route, Routes } from 'react-router';
import {
  AuthRedirectPage,
  HomePage,
  DiscoverPage,
  NotificationsPage,
  ReleasesPage,
  ChannelsPage,
} from '../pages';
import { AuthGuard, NotFoundError, Paths, prefix } from '../shared';
import {
  BookmarksRoutes,
  MessagesRoutes,
  SettingsRoutes,
  UserRoutes,
} from './routes';
import { MainLayout } from '../layout';

function Router() {
  return (
    <Routes>
      <Route path={Paths.authRedirect} element={<AuthRedirectPage />} />
      <Route path='/' element={<MainLayout />}>
        <Route element={<AuthGuard />}>
          {/* Home Route*/}
          <Route path={Paths.root} element={<HomePage />} />
          {/* Discover Route*/}
          <Route path={Paths.discover} element={<DiscoverPage />} />
          {/* Settings Route*/}
          <Route
            path={prefix(Paths.settings, '/*')}
            element={<SettingsRoutes />}
          />
          {/* Profile Route*/}
          <Route
            path={prefix(Paths.username, '/*')}
            element={<UserRoutes />}
          />
          {/* Bookmarks Route */}
          <Route
            path={prefix(Paths.bookmarks, '/*')}
            element={<BookmarksRoutes />}
          />
          {/* Notifications Route */}
          <Route
            path={prefix(Paths.notifications, '/*')}
            element={<NotificationsPage />}
          />
          {/* Messages Route */}
          <Route
            path={prefix(Paths.messages, '/*')}
            element={<MessagesRoutes />}
          />
          {/* Releases Route */}
          <Route
            path={prefix(Paths.releases, '/*')}
            element={<ReleasesPage />}
          />
          {/* Channels Route */}
          <Route
            path={prefix(Paths.channels, '/*')}
            element={<ChannelsPage />}
          />
        </Route>
        <Route path='*' element={<NotFoundError />} />
      </Route>
    </Routes>
  );
}

Router.displayName = 'Router';

export default Router;
