import { HStack } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { GQLRenderer, useGeneralContext } from '../../../../shared';
import { Fragment } from 'react';
import { IProfile } from '../../shared';
import {
  UnblockButton,
  getRelationshipButton,
  useCurrentUser,
  RequestedButton,
  useRelationshipStatusInfo,
  FollowButton,
  RelationshipProvider,
} from '../../../../features';
import {
  EditProfileButton,
  FollowingButton,
  NotificationOptionButton,
} from './index';

const MotionWrapper = motion(HStack);

function SocialButton() {
  const { state: profile } = useGeneralContext<IProfile>();

  const currentUser = useCurrentUser();

  const { data } = useRelationshipStatusInfo(profile.username);

  const type = getRelationshipButton(data.relationshipStatusInfo);

  return (
    <GQLRenderer
      ErrorFallback={() => <Fragment />}
      LoadingFallback={<Fragment />}
    >
      {data.relationshipStatusInfo.isOwned ? (
        <EditProfileButton />
      ) : (
        <Fragment>
          {type === 'follow' && (
            <FollowButton
              type={profile.protected ? 'follow_request' : 'follow'}
              username={profile.username}
            />
          )}

          {type === 'follow_request' && (
            <RequestedButton username={profile.username} />
          )}

          {type === 'block' && (
            <UnblockButton username={profile.username} />
          )}

          {type === 'following' && (
            <MotionWrapper gap={3}>
              <RelationshipProvider username={profile.username}>
                <FollowingButton
                  username={profile.username}
                  sameRole={profile.role === currentUser?.role}
                />
              </RelationshipProvider>
              {profile.role === 'artist' && <NotificationOptionButton />}
            </MotionWrapper>
          )}
        </Fragment>
      )}
    </GQLRenderer>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
