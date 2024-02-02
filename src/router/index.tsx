import { Route, Routes } from 'react-router';
import { AuthRedirectPage, HomePage } from '../pages';
import { AuthGuard, NotFoundError, Paths, prefix } from '../shared';
import { ConnectRoutes, SetupFlowRoutes } from './routes';
import { MainLayout } from '../layout';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

function Router() {
  const location = useLocation();

  const previousLocation = location.state?.previousLocation;

  return (
    <Fragment>
      <Routes location={previousLocation || location}>
        <Route path={Paths.authRedirect} element={<AuthRedirectPage />} />
        <Route element={<MainLayout />}>
          <Route
            path={prefix(Paths.connect, '/*')}
            element={<ConnectRoutes />}
          />
          <Route path='/' element={<AuthGuard />}>
            {/* Home Route*/}
            <Route path={Paths.root} element={<HomePage />} />
            {/*/!* Discover Route*!/*/}
            {/*<Route path={Paths.discover} element={<DiscoverPage />} />*/}
            {/*/!* Settings Route*!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.settings, '/*')}*/}
            {/*  element={<SettingsRoutes />}*/}
            {/*/>*/}
            {/*/!* Profile Route*!/*/}
            {/*<Route*/}
            {/*  path={prefix(Paths.username, '/*')}*/}
            {/*  element={<UserRoutes />}*/}
            {/*/>*/}
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
      <Routes>
        <Fragment>
          <Route
            path={prefix(Paths.setupFlow, '/*')}
            element={<SetupFlowRoutes />}
          />
        </Fragment>
      </Routes>
    </Fragment>
  );
}

Router.displayName = 'Router';

export default Router;
