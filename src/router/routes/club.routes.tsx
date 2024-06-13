import { Route, Routes } from 'react-router';
import {
  ClubPage,
  ClubsMyMembershipsPage,
  ClubsRootPage,
} from '../../pages';
import { Paths } from '../../shared';

const BookmarksRoutes = () => (
  <Routes>
    <Route path='' element={<ClubsRootPage />} />
    <Route path=':slug' element={<ClubPage />} />
    <Route
      path={Paths.club.memberships}
      element={<ClubsMyMembershipsPage />}
    />
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
