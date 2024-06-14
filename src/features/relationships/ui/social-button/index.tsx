import { Fragment } from 'react';
import { IRelationshipStatusInfo } from '../../shared';
import FollowButton from '../follow';
import UnblockButton from '../unblock';
import FollowingButton from '../following';
import RequestedButton from '../requested';

interface SocialButtonProps {
  username: string;
  statusInfo: IRelationshipStatusInfo;
}

function SocialButton({ statusInfo, username }: SocialButtonProps) {
  return (
    <Fragment>
      {statusInfo.isBlocked && <UnblockButton username={username} />}
      {statusInfo.isFollowing && <FollowingButton username={username} />}
      {statusInfo.hasFollowRequest && (
        <RequestedButton username={username} />
      )}
      {!(
        statusInfo.isFollowing ||
        statusInfo.isBlocked ||
        statusInfo.hasFollowRequest
      ) && <FollowButton username={username} />}
    </Fragment>
  );
}

export default SocialButton;
