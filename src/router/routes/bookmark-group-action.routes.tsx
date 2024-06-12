import { Box, Dialog, useDisclosure } from '@holdr-ui/react';
import { Route, Routes } from 'react-router';
import { BookmarkPage } from '../../pages';
import { Navigate } from 'react-router-dom';

function BookmarkGroupActionDialog() {
  const disclosure = useDisclosure(true);
  return (
    <Dialog ariaDescribedBy='' {...disclosure}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content></Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const BookmarkActionRoutes = () => (
  <Routes>
    <Route element={<BookmarkGroupActionDialog />}>
      <Route path='create' element={<Box>Content</Box>} />
      {/*<Route path='all' element={<BookmarkPage />} />*/}
    </Route>
  </Routes>
);

BookmarkActionRoutes.displayName = 'Bookmarks Routes';

export default BookmarkActionRoutes;
