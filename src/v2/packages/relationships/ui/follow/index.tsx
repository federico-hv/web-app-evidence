import { useParams } from 'react-router-dom';
import { Button } from '@holdr-ui/react';
import {
  useCreateRelationshipAction,
  useRequestRelationshipAction,
} from '../../shared';
import { SwitchConditional, SwitchConditionalCase } from '../../../core';
import { useProfile } from '../../../profile';

function FollowButton() {
  const { username } = useParams();

  const { follow, loading: loading0 } = useCreateRelationshipAction(
    username || '',
  );
  const { followRequest, loading: loading1 } =
    useRequestRelationshipAction(username || '');

  const { profile } = useProfile();

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
