import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { BookmarkPage, BookmarksPage } from '../../pages';
const BookmarksRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<BookmarksPage />}>
      <Route path='all' element={<BookmarkPage />} />
      <Route path=':id' element={<BookmarkPage />} />
    </Route>
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
