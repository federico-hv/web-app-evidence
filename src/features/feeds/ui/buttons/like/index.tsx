import {
  useFeedContext,
  useLikeFeed,
  useUnlikeFeed,
} from '../../../shared';
import { IconButton } from '@holdr-ui/react';
import { LikeButtonProps } from './types';

function LikeButton({ size }: LikeButtonProps) {
  const { feedId, reaction } = useFeedContext();
  const { likeFeed } = useLikeFeed();
  const { unlikeFeed } = useUnlikeFeed();

  return (
    <IconButton
      size={size}
      onClick={
        reaction === 'love'
          ? () => unlikeFeed(feedId)
          : () => likeFeed(feedId)
      }
      ariaLabel={reaction === 'love' ? 'like feed' : 'unlike feed'}
      variant='ghost'
      colorTheme='white50'
      icon={reaction === 'love' ? 'heart-fill' : 'heart-outline'}
    />
  );
}
LikeButton.displayName = 'LikeButton';

export default LikeButton;
