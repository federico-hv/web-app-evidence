import { EmptyMessage } from 'shared';

// TODO: integrate bookmarks query
function BookmarkUsersList() {
  return (
    <EmptyMessage
      title='No bookmarks yet.'
      subtitle='Nobody has bookmarked your post yet.'
    />
  );
}

export default BookmarkUsersList;
