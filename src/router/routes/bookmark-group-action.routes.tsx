import { Route, Routes } from 'react-router';
import {
  BookmarkGroupActionDialog,
  CreateBookmarkGroupPage,
  RenameBookmarkGroupPage,
  SaveBookmarkGroupPage,
} from '../../pages';

const BookmarkGroupActionRoutes = () => (
  <Routes>
    <Route path='' element={<BookmarkGroupActionDialog />}>
      <Route path='create' element={<CreateBookmarkGroupPage />} />
      <Route path='save' element={<SaveBookmarkGroupPage />} />
      <Route path='rename/:id' element={<RenameBookmarkGroupPage />} />
    </Route>
  </Routes>
);

BookmarkGroupActionRoutes.displayName = 'BookmarksGroupRoutes';

export default BookmarkGroupActionRoutes;
