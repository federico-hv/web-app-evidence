import { Button } from '@holdr-ui/react';
import { useCreateRelationship } from '../../../lib';
import { useUsername } from '../../../hooks';

function FollowButton() {
  // TODO: Error is given to global Error context
  const username = useUsername();
  const { createRelationship, loading } = useCreateRelationship();

  const follow = async () => {
    await createRelationship({ username, action: 'follow' });
  };

  return (
    <Button
      colorTheme='primary400'
      isLoading={loading}
      loadingText={loading ? '' : 'Loading'}
      onClick={follow}
    >
      Follow
    </Button>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
