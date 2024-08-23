import { useFeedContext } from '../../../shared';
import { Box, HStack, IconButton } from '@holdr-ui/react';
import { BookmarkPopover } from '../../../../bookmarks';
import { useFeedStatistic } from '../../../shared';
import millify from 'millify';
import { useCurrentUser } from '../../../../auth';

function FeedBookmarkGroup() {
  const currentUser = useCurrentUser();
  const { isBookmarked, feedId, owner } = useFeedContext();
  const { data } = useFeedStatistic(feedId, 'bookmarks');
  return (
    <HStack items='center' gap={1} zIndex={5}>
      <BookmarkPopover position='right' sideOffset={0}>
        <IconButton
          variant='ghost'
          colorTheme='white50'
          ariaLabel={!isBookmarked ? 'create bookmark' : 'remove bookmark'}
          icon={!isBookmarked ? 'bookmark-outline' : 'bookmark-fill'}
        />
      </BookmarkPopover>
      {data && currentUser.username === owner.username && (
        <Box cursor='pointer'>
          {millify(data.feedStatistic, { precision: 2 })}
        </Box>
      )}
    </HStack>
  );
}
FeedBookmarkGroup.displayName = 'FeedBookmarkGroup';

export default FeedBookmarkGroup;
