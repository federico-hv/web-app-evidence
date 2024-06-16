import { Route, Routes } from 'react-router';
import { BookmarkPage, BookmarksPage } from '../../pages';
import { Navigate } from 'react-router-dom';
import { Box } from '@holdr-ui/react';

const BookmarksRoutes = () => (
  <Routes>
    <Route path='save' element={<Box />} />
    <Route element={<BookmarksPage />}>
      <Route element={<Navigate to='all' replace />} />
      <Route path='all' element={<BookmarkPage />} />
      <Route path=':id' element={<BookmarkPage />} />
    </Route>
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
