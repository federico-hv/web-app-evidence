import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useCreateRelationshipAction,
} from '../../shared';

function FollowButton({ username }: BaseRelationshipButtonProps) {
  const { follow, loading } = useCreateRelationshipAction();

  return (
    <Button
      css={{ px: '50px' }}
      colorTheme='purple100'
      isLoading={loading}
      loadingText={loading ? '' : 'Follow'}
      onClick={async () => follow(username)}
    >
      Follow
    </Button>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
