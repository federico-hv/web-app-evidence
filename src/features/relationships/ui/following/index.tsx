import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useRemoveRelationshipAction,
} from '../../shared';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

function FollowingButton({
  username,
  colorTheme = 'purple50',
}: BaseRelationshipButtonProps & { colorTheme?: ThemeColor }) {
  const { unfollow, loading } = useRemoveRelationshipAction();

  return (
    <Button
      isLoading={loading}
      loadingText={loading ? '' : 'Following'}
      onClick={async () => unfollow(username)}
      css={{ px: '50px' }}
      colorTheme={colorTheme}
      variant='outline'
    >
      Following
    </Button>
  );
}

export default FollowingButton;
