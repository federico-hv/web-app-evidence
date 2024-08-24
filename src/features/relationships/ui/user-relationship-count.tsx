import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Circle, HStack } from '@holdr-ui/react';
import {
  CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED,
  useGetProfile,
} from '../../user';
import { useRelationshipCount } from '../shared';
import FollowCountItem from './follow-count-item';
import { makePath } from '../../../shared';
import { useQuery } from '@apollo/client';
import { TextProps } from '@holdr-ui/react/dist/components/text/src/text.types';

export function UserRelationshipCount({
  colorTheme = 'primary',
  username,
  labelProps,
  countProps,
}: { username: string } & {
  colorTheme?: 'primary' | 'secondary';
  labelProps?: TextProps;
  countProps?: TextProps;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    loading: loading0,
    data: profileData,
    error: error0,
  } = useGetProfile(username);
  const {
    loading: loading1,
    data: relationshipCountData,
    error: error1,
  } = useRelationshipCount(username);
  const {
    loading: loading2,
    data: checkData,
    error: error2,
  } = useQuery<{ checkIsProfileBlockedOrProtected: boolean }>(
    CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED,
    {
      variables: {
        username,
      },
    },
  );

  if (error1 || error0 || error2 || loading2 || loading0 || loading1) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {profileData && relationshipCountData && checkData && (
        <HStack
          items='center'
          gap={3}
          divider={<Circle bgColor='black300' size='5px' />}
        >
          <FollowCountItem
            labelProps={labelProps}
            countProps={countProps}
            onClick={
              checkData.checkIsProfileBlockedOrProtected
                ? undefined
                : () =>
                    navigate(makePath([username, 'followers']), {
                      state: {
                        colorTheme,
                        previousLocation: pathname,
                      },
                    })
            }
            count={relationshipCountData.relationshipCount.followers}
            label='Followers'
          />
          <FollowCountItem
            labelProps={labelProps}
            countProps={countProps}
            onClick={
              checkData.checkIsProfileBlockedOrProtected
                ? undefined
                : () =>
                    navigate(makePath([username, 'following']), {
                      state: {
                        colorTheme,
                        previousLocation: pathname,
                      },
                    })
            }
            count={relationshipCountData.relationshipCount.following}
            label='Following'
          />
        </HStack>
      )}
    </Fragment>
  );
}
UserRelationshipCount.displayName = 'UserRelationshipCount';

export default UserRelationshipCount;
