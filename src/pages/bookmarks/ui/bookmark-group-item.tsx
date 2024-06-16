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
      radius={1}
      py={2}
      px={3}
      position='relative'
      bgColor={
        params.id === data.id || params['*'] === data.id
          ? 'rgba(152, 152, 255, 0.15)'
          : 'initial'
      }
      _hover={{
        backgroundColor: 'rgba(152, 152, 255, 0.15)',
      }}
    >
      <LinkOverlay to={`/${Paths.bookmarks}/${data.id}`} />
      <HStack items='flex-start'>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={{ '@bp1': 2, '@bp3': 3 }}>
            {data.name}
          </TextGroupHeading>
          <TextGroupSubheading size={{ '@bp1': 1 }} color='white700'>
            {data.total} item{data.total > 1 ? 's' : ''}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
    </Box>
  );
}

BookmarkGroupItem.displayName = 'BookmarkGroupItem';

export default BookmarkGroupItem;
