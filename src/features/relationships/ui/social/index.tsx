import { HStack } from '@holdr-ui/react';
import { motion } from 'framer-motion';

import {
  SwitchConditional,
  SwitchConditionalCase,
  useGeneralContext,
} from '../../../../shared';
import FollowButton from '../follow';
import {
  IProfile,
  RelationshipStatusContextProvider,
  useRelationshipStatusInfo,
} from '../../shared';
import FollowingButton from '../following';
import BlockButton from '../block';
import RequestedButton from '../request';
import EditProfileButton from '../edit-profile-dialog';
import NotificationsButton from '../notifications';
import { Fragment } from 'react';

/*
TODO:
 -[ ] Move to /pages/profile/ui - Button is not used anywhere else, apart from there
 -[ ] Use in pages/profile, separate it from the previous architecture
 -[ ] This needs to be cleaned up
 */

const MotionWrapper = motion(HStack);

function SocialButton() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { data } = useRelationshipStatusInfo(profile.username);

  return (
    <Fragment>
      <RelationshipStatusContextProvider
        value={{ ...data.relationshipStatusInfo }}
      >
        <SwitchConditional>
          <SwitchConditionalCase on={!data.relationshipStatusInfo.isOwned}>
            <HStack gap={3}>
              <SwitchConditional>
                <SwitchConditionalCase
                  on={
                    !data.relationshipStatusInfo.isFollowing &&
                    !data.relationshipStatusInfo.isOwned &&
                    !data.relationshipStatusInfo.hasFollowRequest &&
                    !data.relationshipStatusInfo.isBlocked
                  }
                >
                  <FollowButton />
                </SwitchConditionalCase>
                <SwitchConditionalCase
                  on={!!data.relationshipStatusInfo.hasFollowRequest}
                >
                  <RequestedButton />
                </SwitchConditionalCase>
                <SwitchConditionalCase
                  on={!!data.relationshipStatusInfo.isBlocked}
                >
                  <BlockButton />
                </SwitchConditionalCase>
                <SwitchConditionalCase
                  on={
                    !!data.relationshipStatusInfo.isFollowing &&
                    !data.relationshipStatusInfo.isBlocked
                  }
                >
                  <MotionWrapper gap={3}>
                    <FollowingButton />
                    <NotificationsButton />
                  </MotionWrapper>
                </SwitchConditionalCase>
              </SwitchConditional>
            </HStack>
          </SwitchConditionalCase>
          <SwitchConditionalCase
            on={data.relationshipStatusInfo.isOwned === true}
          >
            <EditProfileButton />
          </SwitchConditionalCase>
        </SwitchConditional>
      </RelationshipStatusContextProvider>
    </Fragment>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
