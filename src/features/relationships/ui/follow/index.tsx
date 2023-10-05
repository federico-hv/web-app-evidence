import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';

interface FollowButtonProps extends BaseRelationshipButtonProps {
  type: 'follow_request' | 'follow';
}

function FollowButton({ type, username }: FollowButtonProps) {
  const { follow, loading: loadingFollow } = useCreateRelationshipAction();
  const { followRequest, loading: loadingRequest } =
    useRequestRelationshipAction();

  return (
    <Button
      colorTheme='base800'
      isLoading={
        type === 'follow_request' ? loadingRequest : loadingFollow
      }
      loadingText={loadingRequest || loadingFollow ? '' : 'Loading'}
      onClick={
        type === 'follow_request'
          ? () => followRequest(username)
          : () => follow(username)
      }
    >
      Follow
    </Button>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
