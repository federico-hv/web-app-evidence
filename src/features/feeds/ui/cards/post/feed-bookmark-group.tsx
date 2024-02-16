import { useFeedContext } from '../../../shared';
import { Box, HStack, IconButton } from '@holdr-ui/react';
import { BookmarkPopover } from '../../../../bookmarks';
import { useFeedStatistic } from '../../../shared';
import millify from 'millify';

function FeedBookmarkGroup() {
  const { bookmarked, feedId } = useFeedContext();
  const { data } = useFeedStatistic(feedId, 'bookmarks');
  return (
    <HStack items='center' gap={2} zIndex={5}>
      <BookmarkPopover position='right' sideOffset={0}>
        <IconButton
          variant='ghost'
          colorTheme='white50'
          ariaLabel={!bookmarked ? 'create bookmark' : 'remove bookmark'}
          icon={!bookmarked ? 'bookmark-outline' : 'bookmark-fill'}
        />
      </BookmarkPopover>
      {data && (
        <Box cursor='pointer'>
          {millify(data.feedStatistic, { precision: 2 })}
        </Box>
      )}
    </HStack>
  );
}
FeedBookmarkGroup.displayName = 'FeedBookmarkGroup';

export default FeedBookmarkGroup;
