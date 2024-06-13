import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useRemoveRelationshipAction,
} from '../../../../features';

function FollowingButton({ username }: BaseRelationshipButtonProps) {
  const { unfollow, loading } = useRemoveRelationshipAction();

  return (
    <Button
      isLoading={loading}
      loadingText={loading ? '' : 'Following'}
      onClick={async () => unfollow(username)}
      css={{ px: '50px' }}
      colorTheme='purple50'
      variant='outline'
    >
      Following
    </Button>
  );
}

export default FollowingButton;
