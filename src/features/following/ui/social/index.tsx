import { HStack, Skeleton } from '@holdr-ui/react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../../shared';
import FollowButton from '../follow';
import {
  RelationshipStatusContextProvider,
  useRelationshipStatusInfo,
} from '../../shared';
import FollowingButton from '../following';
import BlockButton from '../block';
import RequestedButton from '../request';
import EditProfileButton from '../edit';
import OptionsButton from '../options';
import NotificationsButton from '../notifications';

const MotionWrapper = motion(HStack);

function SocialButton() {
  const { username } = useParams();

  const { loading, error, data } = useRelationshipStatusInfo(username);

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading} as={<Skeleton />}>
        {data && (
          <RelationshipStatusContextProvider
            value={{ ...data.relationshipStatusInfo }}
          >
            <SwitchConditional>
              <SwitchConditionalCase
                on={!data.relationshipStatusInfo.isOwned}
              >
                <HStack gap={3}>
                  <OptionsButton />
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
                        <NotificationsButton />
                        <FollowingButton />
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
        )}
      </Loader>
    </Error>
  );
}
SocialButton.displayName = 'SocialButton';

export default SocialButton;
