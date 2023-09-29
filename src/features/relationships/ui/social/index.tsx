import { HStack } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { useGeneralContext } from '../../../../shared';
import FollowButton from '../follow';
import {
  getRelationshipButton,
  IProfile,
  RelationshipStatusContextProvider,
  useRelationshipStatusInfo,
} from '../../shared';

import FollowingButton from '../following';
import UnblockButton from '../unblock';
import RequestedButton from '../request';
import EditProfileButton from '../edit-profile-dialog';
import NotificationsButton from '../notifications';
import { Fragment } from 'react';

const MotionWrapper = motion(HStack);

function SocialButton() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { data } = useRelationshipStatusInfo(profile.username);

  const type = getRelationshipButton(data.relationshipStatusInfo);

  return (
    <Fragment>
      <RelationshipStatusContextProvider
        value={data.relationshipStatusInfo}
      >
        {data.relationshipStatusInfo.isOwned ? (
          <EditProfileButton />
        ) : (
          <Fragment>
            {type === 'follow' && <FollowButton />}

            {type === 'follow_request' && <RequestedButton />}

            {type === 'block' && <UnblockButton />}

            {type === 'following' && (
              <MotionWrapper gap={3}>
                <FollowingButton />
                <NotificationsButton />
              </MotionWrapper>
            )}
          </Fragment>
        )}
      </RelationshipStatusContextProvider>
    </Fragment>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
