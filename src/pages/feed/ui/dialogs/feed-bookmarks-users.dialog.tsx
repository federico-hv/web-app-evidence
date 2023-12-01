import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  useDialogTabContext,
} from 'shared';
import { BookmarkUsersList } from '../lists';
function FeedBookmarksUsersDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  if (option != 'bookmarks') return null;

  return (
    <CommonDialog
      minHeight='85vh'
      isOpen={isOpen}
      onOpen={() => onOpen('views')}
      onClose={onClose}
    >
      <CommonDialogHeader label='Feed Booksmarks' />
      <CommonDialogContent>
        <BookmarkUsersList />
      </CommonDialogContent>
    </CommonDialog>
  );
}

export default FeedBookmarksUsersDialog;
