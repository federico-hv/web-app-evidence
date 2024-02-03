import { Route, Routes } from 'react-router';
import { ClubsPage } from '../../pages';

const BookmarksRoutes = () => (
  <Routes>
    <Route path='' element={<ClubsPage />} />
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
