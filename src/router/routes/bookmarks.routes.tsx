import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { BookmarkPage, BookmarksPage } from '../../pages';
import { Navigate } from 'react-router-dom';
import { Dialog, useDisclosure } from '@holdr-ui/react';

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
