import { useFeedContext } from '../../../shared';
import { IconButton } from '@holdr-ui/react';
import { BookmarkButtonProps } from './types';

function BookmarkButton({ size }: BookmarkButtonProps) {
  const { isBookmarked } = useFeedContext();

  return (
    <IconButton
      variant='ghost'
      colorTheme='white50'
      ariaLabel={!isBookmarked ? 'create bookmark' : 'remove bookmark'}
      icon={!isBookmarked ? 'bookmark-outline' : 'bookmark-fill'}
      size={size}
    />
  );
}
BookmarkButton.displayName = 'BookmarkButton';

export default BookmarkButton;
