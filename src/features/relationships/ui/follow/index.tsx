import { Button } from '@holdr-ui/react';
import {
  IProfile,
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
import { useGeneralContext } from '../../../../shared';

function FollowButton() {
  const { follow, loading: loadingFollow } = useCreateRelationshipAction();
  const { followRequest, loading: loadingRequest } =
    useRequestRelationshipAction();

  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Button
      colorTheme={profile.protected ? 'primary400' : 'base800'}
      isLoading={profile.protected ? loadingRequest : loadingFollow}
      loadingText={loadingRequest || loadingFollow ? '' : 'Loading'}
      onClick={
        profile.protected
          ? () => followRequest(profile.username)
          : () => follow(profile.username)
      }
    >
      Follow
    </Button>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
