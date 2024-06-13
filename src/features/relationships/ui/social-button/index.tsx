import { Button } from '@holdr-ui/react';
import { useRelationshipStatusInfo } from '../../shared';
import { GQLRenderer } from '../../../../shared';
import { Fragment } from 'react';
import FollowButton from '../follow';
import { useSuspenseGetProfile } from '../../../user';
import UnblockButton from '../unblock';
import FollowingButton from '../following';
import RequestedButton from '../requested';

function SocialButton({ username }: { username: string }) {
  return (
    <GQLRenderer
      LoadingFallback={<Fragment />}
      ErrorFallback={() => <Fragment />}
    >
      <Content username={username} />
    </GQLRenderer>
  );
}

function Content({ username }: { username: string }) {
  const { data: profileData } = useSuspenseGetProfile(username);

  const { data: statusData } = useRelationshipStatusInfo(username);

  return (
    <Fragment>
      {statusData.relationshipStatusInfo.isBlocked && (
        <UnblockButton username={username} />
      )}
      {statusData.relationshipStatusInfo.hasFollowRequest && (
        <RequestedButton username={username} />
      )}
      {statusData.relationshipStatusInfo.isFollowing && (
        <FollowingButton username={username} />
      )}
      {!(
        !!statusData.relationshipStatusInfo.hasFollowRequest ||
        !!statusData.relationshipStatusInfo.isFollowing ||
        !!statusData.relationshipStatusInfo.isBlocked
      ) && (
        <FollowButton
          isProtected={profileData.profile.protected}
          username={username}
        />
      )}
    </Fragment>
  );
}

export default SocialButton;
