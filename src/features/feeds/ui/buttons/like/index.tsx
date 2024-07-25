import { IconButton } from '@holdr-ui/react';
import { useFeedContext } from '../../../shared';
import { LikeButtonProps } from './types';
import {
  useLikeFeedMutation,
  useUnlikeFeedMutation,
} from '../../../mutations';

function LikeButton({ size }: LikeButtonProps) {
  const { feedId, isLiked } = useFeedContext();
  const { likeFeed } = useLikeFeedMutation();
  const { unlikeFeed } = useUnlikeFeedMutation();

  return (
    <IconButton
      size={size}
      onClick={isLiked ? () => unlikeFeed(feedId) : () => likeFeed(feedId)}
      ariaLabel={isLiked ? 'like feed' : 'unlike feed'}
      variant='ghost'
      colorTheme='white50'
      icon={isLiked ? 'heart-fill' : 'heart-outline'}
    />
  );
}
LikeButton.displayName = 'LikeButton';

export default LikeButton;
