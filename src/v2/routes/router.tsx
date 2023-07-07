import { Route, Routes } from 'react-router';
import { AuthGuard, MainLayout, Paths } from '../packages';
import { ProfilePage, AuthRedirectPage } from '../pages';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route element={<AuthGuard />}>
          <Route path='/:username' element={<ProfilePage />} />
        </Route>
        <Route path={Paths.authRedirect} element={<AuthRedirectPage />} />
      </Route>
    </Routes>
  );
}

Router.displayName = 'Router';

export default Router;
