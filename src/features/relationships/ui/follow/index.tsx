import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';

interface FollowButtonProps extends BaseRelationshipButtonProps {
  isProtected: boolean;
}

function FollowButton({ isProtected, username }: FollowButtonProps) {
  const { follow, loading: loadingFollow } = useCreateRelationshipAction();
  const { followRequest, loading: loadingRequest } =
    useRequestRelationshipAction();

  return (
    <Button
      css={{ px: '50px' }}
      colorTheme='purple100'
      isLoading={loadingRequest || loadingFollow}
      loadingText={loadingRequest || loadingFollow ? '' : 'Follow'}
      onClick={
        isProtected
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
