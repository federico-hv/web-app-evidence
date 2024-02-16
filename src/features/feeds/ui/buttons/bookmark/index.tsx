import { useFeedContext } from '../../../shared';
import { IconButton } from '@holdr-ui/react';
import { BookmarkButtonProps } from './types';

function BookmarkButton({ size }: BookmarkButtonProps) {
  const { bookmarked } = useFeedContext();

  return (
    <IconButton
      variant='ghost'
      colorTheme='white50'
      ariaLabel={!bookmarked ? 'create bookmark' : 'remove bookmark'}
      icon={!bookmarked ? 'bookmark-outline' : 'bookmark-fill'}
      size={size}
    />
  );
}
BookmarkButton.displayName = 'BookmarkButton';

export default BookmarkButton;
