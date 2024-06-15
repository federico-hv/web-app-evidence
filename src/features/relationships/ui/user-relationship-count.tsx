import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Circle, HStack } from '@holdr-ui/react';
import { useGetProfile } from '../../user';
import { useRelationshipCount } from '../shared';
import FollowCountItem from './follow-count-item';
import { makePath } from '../../../shared';

export function UserRelationshipCount({ username }: { username: string }) {
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

  if (error1 || error0 || loading0 || loading1) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {profileData && relationshipCountData && (
        <HStack
          items='center'
          gap={3}
          divider={<Circle bgColor='black300' size='5px' />}
        >
          <FollowCountItem
            onClick={
              profileData.profile.protected
                ? undefined
                : () =>
                    navigate(makePath([username, 'followers']), {
                      state: {
                        previousLocation: pathname,
                      },
                    })
            }
            count={relationshipCountData.relationshipCount.followers}
            label='Followers'
          />
          <FollowCountItem
            onClick={
              profileData.profile.protected
                ? undefined
                : () =>
                    navigate(makePath([username, 'following']), {
                      state: {
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
