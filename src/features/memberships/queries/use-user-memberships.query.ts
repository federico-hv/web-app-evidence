import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_USER_MEMBERSHIPS } from './schema';
import { IConnection, IPaginationParams } from '../../../shared';
import { IMembership } from '../shared';

export function useUserMembershipsQuery(
  username: string,
  params?: IPaginationParams<number>,
) {
  return useQuery<
    {
      userMemberships: IConnection<IMembership, string>;
    },
    { username: string; params?: IPaginationParams<number> }
  >(GET_USER_MEMBERSHIPS, {
    variables: { params, username },
  });
}

export function useUserMembershipsSuspenseQuery(
  username: string,
  params?: IPaginationParams<number>,
) {
  return useSuspenseQuery<
    {
      userMemberships: IConnection<IMembership, string>;
    },
    { username: string; params?: IPaginationParams<number> }
  >(GET_USER_MEMBERSHIPS, {
    variables: { params, username },
  });
}
