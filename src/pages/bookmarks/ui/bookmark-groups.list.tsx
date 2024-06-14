import { useSuspenseQuery } from '@apollo/client';
import {
  GET_ALL_BOOKMARKS_TOTAL,
  useGetBookmarkGroups,
} from '../../../features';
import { Box, VStack } from '@holdr-ui/react';
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
  /**
   * TODO:
   * 1. make this a lazy query.
   * 2. add debouncing.
   * 3. load data when page loads.
   */
  const { data } = useGetBookmarkGroups();

  return (
    <VStack>
      <AllBookmarkGroupsItem />
      {data.bookmarkGroups.edges.map(({ node }) => (
        <BookmarkGroupItem key={node.id} data={node} />
      ))}
    </VStack>
  );
}
BookmarkGroupsList.displayName = 'BookmarkGroupsList';

export default BookmarkGroupsList;
