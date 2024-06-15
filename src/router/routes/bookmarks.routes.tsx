import { Route, Routes } from 'react-router';
import { BookmarkPage, BookmarksPage } from '../../pages';
import { Navigate } from 'react-router-dom';

const BookmarksRoutes = () => (
  <Routes>
    <Route path='' element={<BookmarksPage />}>
      <Route path='' element={<Navigate to='all' />} />
      <Route path=':id' element={<BookmarkPage />} />
      <Route path='all' element={<BookmarkPage />} />
    </Route>
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
