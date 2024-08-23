import { Fragment } from 'react';
import { IRelationshipStatusInfo } from '../../shared';
import FollowButton from '../follow';
import UnblockButton from '../unblock';
import FollowingButton from '../following';
import RequestedButton from '../requested';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

interface SocialButtonProps {
  username: string;
  statusInfo: IRelationshipStatusInfo;
  colorTheme?: {
    follow?: ThemeColor;
    following?: ThemeColor;
  };
}

function SocialButton({
  statusInfo,
  username,
  colorTheme,
}: SocialButtonProps) {
  return (
    <Fragment>
      {statusInfo.isBlocked && <UnblockButton username={username} />}
      {statusInfo.isFollowing && (
        <FollowingButton
          colorTheme={colorTheme?.following}
          username={username}
        />
      )}
      {statusInfo.hasFollowRequest && (
        <RequestedButton username={username} />
      )}
      {!(
        statusInfo.isFollowing ||
        statusInfo.isBlocked ||
        statusInfo.hasFollowRequest
      ) && (
        <FollowButton
          colorTheme={colorTheme?.follow}
          username={username}
        />
      )}
    </Fragment>
  );
}

export default SocialButton;
