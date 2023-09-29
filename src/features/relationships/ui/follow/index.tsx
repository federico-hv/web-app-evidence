import { Button } from '@holdr-ui/react';
import {
  IProfile,
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
import {
  SwitchConditional,
  SwitchConditionalCase,
  useGeneralContext,
} from '../../../../shared';

function FollowButton() {
  const { follow, loading: loading0 } = useCreateRelationshipAction();
  const { followRequest, loading: loading1 } =
    useRequestRelationshipAction();

  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={!profile.protected}>
        <Button
          colorTheme='base800'
          isLoading={loading0}
          loadingText={loading0 ? '' : 'Loading'}
          onClick={async () => follow(profile.username)}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={profile.protected}>
        <Button
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
          colorTheme='primary400'
          isLoading={loading1}
          loadingText={loading1 ? '' : 'Loading'}
          onClick={async () => followRequest(profile.username)}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
