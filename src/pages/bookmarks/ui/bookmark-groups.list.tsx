import { useSuspenseQuery } from '@apollo/client';
import {
  GET_ALL_BOOKMARKS_TOTAL,
  useBookmarkGroupsSuspenseQuery,
} from '../../../features';
import { VStack } from '@holdr-ui/react';
import { AllBookmarkGroups } from '../constants';
import BookmarkGroupItem from './bookmark-group-item';

function AllBookmarkGroupsItem() {
  const { data } = useSuspenseQuery<{ allBookmarkTotal: number }>(
    GET_ALL_BOOKMARKS_TOTAL,
    { fetchPolicy: 'cache-and-network' },
  );

  return (
    <BookmarkGroupItem
      data={{
        ...AllBookmarkGroups,
        total: data.allBookmarkTotal,
      }}
    />
  );
}

function BookmarkGroupsList() {
  const { data } = useBookmarkGroupsSuspenseQuery();

  return (
    <VStack p={2} gap={2}>
      <AllBookmarkGroupsItem />
      {data.bookmarkGroups.edges.map(({ node }) => (
        <BookmarkGroupItem key={node.id} data={node} />
      ))}
    </VStack>
  );
}
BookmarkGroupsList.displayName = 'BookmarkGroupsList';

export default BookmarkGroupsList;
