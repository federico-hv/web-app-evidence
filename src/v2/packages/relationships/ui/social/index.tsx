import { HStack, Skeleton } from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../core';
import FollowButton from '../follow';
import {
  RelationshipStatusContextProvider,
  RelationshipStatusInfo,
} from '../../shared';
import FollowingButton from '../following';
import BlockButton from '../block';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../queries';
import RequestedButton from '../request';
import EditProfileButton from '../edit';
import OptionsButton from '../options';
import NotificationsButton from '../notifications';

const MotionWrapper = motion(HStack);

function SocialButton() {
  const { username } = useParams();

  const { data, loading, error } = useQuery<{
    relationshipStatusInfo: RelationshipStatusInfo;
  }>(GET_RELATIONSHIP_STATUS_INFO, {
    variables: {
      username: username,
    },
  });

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
