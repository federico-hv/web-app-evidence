import { useFeedContext } from '../../../shared';
import { Box, HStack, IconButton, useDisclosure } from '@holdr-ui/react';
import { BookmarkPopover } from '../../../../bookmarks';
import { useFeedStatistic } from '../../../shared';
import millify from 'millify';
import { useCurrentUser } from '../../../../auth';
import BookmarksDialog from '../../dialogs/bookmarks.dialog';

function FeedBookmarkGroup() {
  const disclosure = useDisclosure();

  const currentUser = useCurrentUser();

  const { isBookmarked, feedId, owner } = useFeedContext();

  const { data } = useFeedStatistic(feedId, 'bookmarks');

  return (
    <HStack w={70} items='center' zIndex={5}>
      <BookmarkPopover position='right' sideOffset={0}>
        <IconButton
          variant='ghost'
          colorTheme='white50'
          ariaLabel={!isBookmarked ? 'create bookmark' : 'remove bookmark'}
          icon={!isBookmarked ? 'bookmark-outline' : 'bookmark-fill'}
        />
      </BookmarkPopover>
      {data && currentUser.username === owner.username && (
        <Box
          onClick={
            currentUser.id === owner.id ? disclosure.onOpen : undefined
          }
          px={2}
          fontSize={2}
          _hover={
            currentUser.id === owner.id
              ? {
                  color: '$white700',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }
              : undefined
          }
        >
          {millify(data.feedStatistic, { precision: 2 })}
        </Box>
      )}
      {currentUser.id === owner.id && disclosure.isOpen && (
        <BookmarksDialog {...disclosure} />
      )}
    </HStack>
  );
}
FeedBookmarkGroup.displayName = 'FeedBookmarkGroup';

export default FeedBookmarkGroup;
