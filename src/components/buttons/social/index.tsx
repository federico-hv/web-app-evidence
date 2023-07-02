import { Skeleton, HStack } from '@holdr-ui/react';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../utility';
import { EditProfileDialog } from '../../dialog';
import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP_STATUS_INFO, RelationshipStatusInfo } from 'lib';
import {
  FollowButton,
  FollowingButton,
  ProfileOptionsButton,
  RequestedButton,
  ProfileNotificationsButton,
} from '../index';
import { MotionWrapper } from '../../../shared';
import { RelationshipStatusContextProvider } from '../../../contexts';
import { useUsername } from '../../../hooks';

function SocialButton() {
  const username = useUsername();

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
        {data && data.relationshipStatusInfo && (
          <RelationshipStatusContextProvider
            value={{ ...data.relationshipStatusInfo }}
          >
            <SwitchConditional>
              <SwitchConditionalCase
                on={!data.relationshipStatusInfo.isOwned}
              >
                <HStack gap={3}>
                  <ProfileOptionsButton />
                  <SwitchConditional>
                    <SwitchConditionalCase
                      on={
                        !data.relationshipStatusInfo.isFollowing &&
                        !data.relationshipStatusInfo.isOwned &&
                        !data.relationshipStatusInfo.hasFollowRequest
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
                      on={!!data.relationshipStatusInfo.isFollowing}
                    >
                      <MotionWrapper gap={3}>
                        <ProfileNotificationsButton />
                        <FollowingButton />
                      </MotionWrapper>
                    </SwitchConditionalCase>
                  </SwitchConditional>
                </HStack>
              </SwitchConditionalCase>
              <SwitchConditionalCase
                on={data.relationshipStatusInfo.isOwned === true}
              >
                <EditProfileDialog />
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
