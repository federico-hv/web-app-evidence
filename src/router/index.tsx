import { Route, Routes } from 'react-router';
import { AuthRedirectPage, HomePage } from '../pages';
import {
  AuthGuard,
  makePath,
  NotFoundError,
  Paths,
  prefix,
} from '../shared';
import {
  ClubRoutes,
  UserRelationshipRoutes,
  SetupAccountRoutes,
  SetupProfileRoutes,
  UserRoutes,
  EditGeneralUserProfileRoutes,
  ArtistProfileRoutes,
  GeneralUserMembershipRoutes,
  BookmarksRoutes,
  SettingsRoutes,
  BookmarkGroupActionRoutes,
  ArtistClubOverlayRoutes,
} from './routes';
import { MainLayout } from '../layout';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { DevRoutes } from './__dev__';

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
            path='/'
            element={<AuthGuard roles={['artist', 'general']} />}
          >
            {/* Home Route*/}
            <Route path={Paths.root} element={<HomePage />} />
            {/* Club Routes */}
            <Route
              path={prefix(Paths.clubs, '/*')}
              element={<ClubRoutes />}
            />
            {/*/!* Settings Route*!/*/}
            <Route
              path={prefix(Paths.settings, '/*')}
              element={<SettingsRoutes />}
            />
            <Route
              path={prefix('artist/:username', '/*')}
              element={<ArtistProfileRoutes />}
            />
            {/*<Route*/}
            {/*  element={*/}
            {/*    <AuthGuard*/}
            {/*      roles={['artist']}*/}
            {/*      fallback={<Navigate to='/' />}*/}
            {/*    />*/}
            {/*  }*/}
            {/*>*/}
            {/*  <Route*/}
            {/*    path={prefix('artist/:username', '/*')}*/}
            {/*    element={<ArtistProfileRoutes />}*/}
            {/*  />*/}
            {/*</Route>*/}
            {/*/!* Profile Route*!/*/}
            <Route
              path={prefix(Paths.username, '/*')}
              element={<UserRoutes />}
            />
            {/*/!* Bookmarks Route *!/*/}
            <Route
              path={prefix(Paths.bookmarks, '/*')}
              element={<BookmarksRoutes />}
            />
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
          </Route>

          <Route path='*' element={<NotFoundError />} />
        </Route>
      </Routes>
      {/*Dialog routes*/}
      <Routes>
        <Route
          path={prefix(Paths.setupAccount, '/*')}
          element={<SetupAccountRoutes />}
        />
        <Route
          path={prefix(Paths.setupProfile, '/*')}
          element={<SetupProfileRoutes />}
        />
        <Route
          path={makePath([Paths.clubs, '/*'])}
          element={<ArtistClubOverlayRoutes />}
        />
        <Route
          path={prefix(Paths.bookmarks, '/*')}
          element={<BookmarkGroupActionRoutes />}
        />
        <Route
          path={prefix(':username', '/*')}
          element={<UserRelationshipRoutes />}
        />
        <Route
          element={
            <AuthGuard roles={['general']} fallback={<Fragment />} />
          }
        >
          <Route
            path={prefix(':username/edit', '/*')}
            element={<EditGeneralUserProfileRoutes />}
          />

          <Route
            path={prefix(':username/memberships', '/*')}
            element={<GeneralUserMembershipRoutes />}
          />
        </Route>
      </Routes>
    </Fragment>
  );
}

Router.displayName = 'Router';

export default Router;
