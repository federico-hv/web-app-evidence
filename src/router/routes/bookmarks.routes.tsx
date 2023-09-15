import { Route, Routes } from 'react-router';
import { Paths } from '../../shared';
import { BookmarksPage } from '../../pages';
import { AllBookmarks } from '../../pages/bookmark/ui';
import BookmarkPage from '../../pages/bookmark';

const BookmarksRoutes = () => (
  <Routes>
    <Route path={Paths.root} element={<BookmarksPage />}>
      <Route path='all' element={<AllBookmarks />} />
      <Route path=':id' element={<BookmarkPage />} />
    </Route>
  </Routes>
);

BookmarksRoutes.displayName = 'Bookmarks Routes';

export default BookmarksRoutes;
