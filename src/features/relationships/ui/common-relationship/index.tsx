import {
  BaseRelationshipButtonProps,
  getRelationshipButton,
  useRelationshipStatusInfo,
} from '../../shared';

import { Box } from '@holdr-ui/react';
import { Fragment } from 'react';
import UnfollowButton from '../unfollow';
import FollowButton from '../follow';
import { useSuspenseQuery } from '@apollo/client';
import { GET_PROFILE, IProfile } from '../../../user';

function CommonRelationshipButton({
  username,
}: BaseRelationshipButtonProps) {
  const {
    data: { profile },
  } = useSuspenseQuery<{ profile: IProfile }>(GET_PROFILE, {
    variables: {
      username: username,
    },
  });

  const { data } = useRelationshipStatusInfo(username);

  const type = getRelationshipButton(data.relationshipStatusInfo);

  return (
    <Fragment>
      <Box position='relative' zIndex={5}>
        {type === 'follow' && <FollowButton username={profile.username} />}
        {type === 'following' && (
          <UnfollowButton username={profile.username} />
        )}
      </Box>
    </Fragment>
  );
}
CommonRelationshipButton.displayName = 'CommonRelationshipButton';

export default CommonRelationshipButton;
