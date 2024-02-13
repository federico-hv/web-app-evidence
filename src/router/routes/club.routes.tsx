import { Route, Routes } from 'react-router';
import {
  ClubsAllPage,
  ClubsMyMembershipsPage,
  ClubsMyWatchlistPage,
  ClubsRootPage,
} from '../../pages';
import { Paths } from '../../shared';

const BookmarksRoutes = () => (
  <Routes>
    <Route path='' element={<ClubsRootPage />} />
    <Route path={Paths.all} element={<ClubsAllPage />} />
    <Route
      path={Paths.club.memberships}
      element={<ClubsMyMembershipsPage />}
    />
    <Route
      path={Paths.club.watchlist}
      element={<ClubsMyWatchlistPage />}
    />
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
