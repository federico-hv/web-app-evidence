import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  EmptyMessage,
  useDialogTabContext,
} from 'shared';

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

// TODO: integrate bookmarks query
function BookmarkUsersList() {
  return (
    <EmptyMessage
      title='No bookmarks yet.'
      subtitle='Nobody has bookmarked your post yet.'
    />
  );
}

export default FeedBookmarksUsersDialog;
