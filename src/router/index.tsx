import { Route, Routes } from 'react-router';
import { AuthRedirectPage, HomePage, DiscoverPage } from '../pages';
import { AuthGuard, NotFoundError, Paths, prefix } from '../shared';
import { MainLayout } from '../features';
import { BookmarksRoutes, SettingsRoutes, UserRoutes } from './routes';

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
          {/* Bookmarks Route*/}
          <Route
            path={prefix(Paths.bookmarks, '/*')}
            element={<BookmarksRoutes />}
          />
        </Route>
        <Route path='*' element={<NotFoundError />} />
      </Route>
    </Routes>
  );
}

Router.displayName = 'Router';

export default Router;
