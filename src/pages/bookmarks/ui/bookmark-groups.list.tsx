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
import { GET_BOOKMARK_GROUPS, IBookmarkGroup } from '../../../features';
import { Box, VStack } from '@holdr-ui/react';
import { useParams } from 'react-router-dom';

function BookmarkGroupItem({ data }: { data: IBookmarkGroup }) {
  return (
    <TextGroup>
      <TextGroupHeading as='h3' size={3}>
        {data.name}
      </TextGroupHeading>
      <TextGroupSubheading size={2} color='base300' weight={500}>
        {data.total} post{data.total > 1 ? 's' : ''}
      </TextGroupSubheading>
    </TextGroup>
  );
}
BookmarkGroupItem.displayName = 'BookmarkGroupItem';

function BookmarkGroupsList() {
  const { data } = useSuspenseQuery<
    { bookmarkGroups: IConnection<IBookmarkGroup, string> },
    {
      feedId?: string;
      params?: IPaginationParams<string>;
    }
  >(GET_BOOKMARK_GROUPS);

  const params = useParams();

  return (
    <VStack>
      {data.bookmarkGroups.edges.map((edge) => (
        <Box
          key={edge.node.id}
          p={4}
          borderBottom={2}
          borderColor='base100'
          position='relative'
          bgColor={params.id === edge.node.id ? 'base100' : 'initial'}
          _hover={{
            backgroundColor:
              params.id !== edge.node.id ? '$base100' : '$base100',
          }}
        >
          <LinkOverlay to={`/${Paths.bookmarks}/${edge.node.id}`} />
          <BookmarkGroupItem data={edge.node} />
        </Box>
      ))}
    </VStack>
  );
}
BookmarkGroupsList.displayName = 'BookmarkGroupsList';

export default BookmarkGroupsList;
