import { Button } from '@holdr-ui/react';
import {
  BaseRelationshipButtonProps,
  useCreateRelationshipAction,
} from '../../shared';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

function FollowButton({
  username,
  colorTheme = 'purple100',
}: BaseRelationshipButtonProps & { colorTheme?: ThemeColor }) {
  const { follow, loading } = useCreateRelationshipAction();

  return (
    <Button
      css={{ px: '50px' }}
      colorTheme={colorTheme}
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
