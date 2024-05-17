import { Route, Routes } from 'react-router';
import { AuthRedirectPage, HomePage } from '../pages';
import { AuthGuard, NotFoundError, Paths, prefix } from '../shared';
import {
  ClubRoutes,
  ConnectRoutes,
  SetupArtistAccountRoutes,
  SetupFlowRoutes,
  SetupProfileRoutes,
  UserRoutes,
} from './routes';
import { MainLayout } from '../layout';
import { Fragment } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { DevRoutes } from './__dev__';
import SetupFanAccountRoutes from './routes/setup-fan-account.routes';

function Router() {
  const location = useLocation();

  const previousLocation = location.state?.previousLocation;

  return (
    <Fragment>
      {/*Main page routes*/}
      <Routes location={previousLocation || location}>
        <Route path={Paths.authRedirect} element={<AuthRedirectPage />} />
        {import.meta.env.VITE_ENVIRONMENT === 'development' && (
          <Route path='__dev__/*' element={<DevRoutes />} />
        )}
        <Route element={<MainLayout />}>
          <Route
            path={prefix(Paths.connect, '/*')}
            element={<ConnectRoutes />}
          />
          <Route path='/' element={<AuthGuard />}>
            {/* Home Route*/}
            <Route path={Paths.root} element={<HomePage />} />
            {/* Club Routes */}
            <Route
              path={prefix(Paths.clubs, '/*')}
              element={<ClubRoutes />}
            />
            {/*/!* Discover Route*!/*/}
            {/*<Route path={Paths.discover} element={<DiscoverPage />} />*/}
            {/*/!* Settings Route*!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.settings, '/*')}*/}
            {/*  element={<SettingsRoutes />}*/}
            {/*/>*/}
            {/*/!* Profile Route*!/*/}
            <Route
              path={prefix(Paths.username, '/*')}
              element={<UserRoutes />}
            />
            {/*/!* Bookmarks Route *!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.bookmarks, '/*')}*/}
            {/*  element={<BookmarksRoutes />}*/}
            {/*/>*/}
            {/*/!* Notifications Route *!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.notifications, '/*')}*/}
            {/*  element={<NotificationsPage />}*/}
            {/*/>*/}
            {/*/!* Messages Route *!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.messages, '/*')}*/}
            {/*  element={<MessagesRoutes />}*/}
            {/*/>*/}
            {/*/!* Releases Route *!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.releases, '/*')}*/}
            {/*  element={<ReleasesRoutes />}*/}
            {/*/>*/}
            {/*/!* Channels Route *!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.channels, '/*')}*/}
            {/*  element={<ChannelsPage />}*/}
            {/*/>*/}
          </Route>

          <Route path='*' element={<NotFoundError />} />
        </Route>
      </Routes>
      {/*Dialog routes*/}
      <Routes>
        <Route
          element={
            <AuthGuard roles={['artist']} fallback={<Navigate to='/' />} />
          }
        >
          <Route
            path={prefix(Paths.setupArtistAccount, '/*')}
            element={<SetupArtistAccountRoutes />}
          />
          <Route
            path={prefix(Paths.setupProfile, '/*')}
            element={<SetupProfileRoutes />}
          />
        </Route>
        <Route
          element={
            <AuthGuard
              roles={['general']}
              fallback={<Navigate to='/' />}
            />
          }
        >
          <Route
            path={prefix(Paths.setupFanAccount, '/*')}
            element={<SetupFanAccountRoutes />}
          />
        </Route>
        <Route
          path={prefix(Paths.setupFlow, '/*')}
          element={<SetupFlowRoutes />}
        />
      </Routes>
    </Fragment>
  );
}

Router.displayName = 'Router';

export default Router;
