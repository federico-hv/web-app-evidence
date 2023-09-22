import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import {
  AllBookmarksPage,
  BookmarkPage,
  BookmarksPage,
} from '../../pages';
const BookmarksRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<BookmarksPage />}>
      <Route path='all' element={<AllBookmarksPage />} />
      <Route path=':id' element={<BookmarkPage />} />
    </Route>
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
