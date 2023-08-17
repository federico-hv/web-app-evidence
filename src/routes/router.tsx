import { Route, Routes } from 'react-router';
import {
  ProfilePage,
  AuthRedirectPage,
  HomePage,
  FeedPage,
  DiscoverPage,
} from '../pages';
import { AuthGuard, NotFoundError, Paths, prefix } from '../shared';
import { MainLayout } from '../features';
import SettingsRoutes from './settings.routes';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route element={<AuthGuard />}>
          <Route path='' element={<HomePage />} />
          <Route path={Paths.discover} element={<DiscoverPage />} />
          <Route
            path={prefix(Paths.settings, '/*')}
            element={<SettingsRoutes />}
          />
          <Route path='/:username'>
            <Route path='' element={<ProfilePage />} />
            <Route path='feeds/:id' element={<FeedPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundError />} />
      </Route>
      <Route path={Paths.authRedirect} element={<AuthRedirectPage />} />
    </Routes>
  );
}

Router.displayName = 'Router';

export default Router;
