import {
  IConnection,
  IPaginationParams,
  LinkOverlay,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
import { useSuspenseQuery } from '@apollo/client';
import {
  GET_ALL_BOOKMARKS_TOTAL,
  GET_BOOKMARK_GROUPS,
  IBookmarkGroup,
} from '../../../features';
import { Box, HStack, Icon, VStack } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';

function BookmarkGroupItem({ data }: { data: IBookmarkGroup }) {
  const params = useParams();

  return (
    <Box
      p={4}
      position='relative'
      borderLeft={2}
      borderColor={
        params.id === data.id || params['*'] === data.id
          ? 'base800'
          : 'base100'
      }
      bgColor={
        params.id === data.id || params['*'] === data.id
          ? 'base100'
          : 'initial'
      }
      _hover={{
        backgroundColor: '$base100',
      }}
    >
      <LinkOverlay to={`/${Paths.bookmarks}/${data.id}`} />
      <HStack items='flex-start'>
        <TextGroup>
          <TextGroupHeading as='h3' size={3}>
            {data.name}
          </TextGroupHeading>
          <TextGroupSubheading size={2} color='base400'>
            {data.total} item{data.total > 1 ? 's' : ''}
          </TextGroupSubheading>
        </TextGroup>
        <Icon name='lock-fill' color='base400' />
      </HStack>
    </Box>
  );
}
BookmarkGroupItem.displayName = 'BookmarkGroupItem';

function BookmarkGroupsList() {
  const { data: data1 } = useSuspenseQuery<
    { bookmarkGroups: IConnection<IBookmarkGroup, string> },
    {
      feedId?: string;
      params?: IPaginationParams<string>;
    }
  >(GET_BOOKMARK_GROUPS);

  const { data: data2 } = useSuspenseQuery<{ allBookmarkTotal: number }>(
    GET_ALL_BOOKMARKS_TOTAL,
  );

  return (
    <VStack divider={<Box borderBottom={2} borderColor='base100' />}>
      <BookmarkGroupItem
        data={{
          id: 'all',
          name: 'All Bookmarks',
          total: data2.allBookmarkTotal,
        }}
      />
      {data1.bookmarkGroups.edges.map((edge) => (
        <BookmarkGroupItem key={edge.node.id} data={edge.node} />
      ))}
    </VStack>
  );
}
BookmarkGroupsList.displayName = 'BookmarkGroupsList';

export default BookmarkGroupsList;
