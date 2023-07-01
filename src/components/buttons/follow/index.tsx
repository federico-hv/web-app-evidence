import { Button } from '@holdr-ui/react';
import { useUsername } from '../../../hooks';
import { useProfileContext } from '../../../contexts';
import { SwitchConditional, SwitchConditionalCase } from '../../utility';
import {
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../following';

function FollowButton() {
  const username = useUsername();
  const { follow, loading: loading0 } =
    useCreateRelationshipAction(username);
  const { followRequest, loading: loading1 } =
    useRequestRelationshipAction(username);
  const { profile } = useProfileContext();

  return (
    <SwitchConditional>
      <SwitchConditionalCase on={!profile.protected}>
        <Button
          colorTheme='primary400'
          isLoading={loading0}
          loadingText={loading0 ? '' : 'Loading'}
          onClick={follow}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
      <SwitchConditionalCase on={profile.protected}>
        <Button
          colorTheme='primary400'
          isLoading={loading1}
          loadingText={loading1 ? '' : 'Loading'}
          onClick={followRequest}
        >
          Follow
        </Button>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}

FollowButton.displayName = 'FollowButton';

export default FollowButton;
