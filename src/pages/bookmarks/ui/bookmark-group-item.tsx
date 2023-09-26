import { IBookmarkGroup } from '../../../features';
import { useParams } from 'react-router-dom';
import { Box, HStack, Icon } from '@holdr-ui/react';
import {
  LinkOverlay,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';

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
        <Icon
          name={data.private ? 'lock-fill' : 'global-outline'}
          color='base400'
        />
      </HStack>
    </Box>
  );
}

BookmarkGroupItem.displayName = 'BookmarkGroupItem';

export default BookmarkGroupItem;
