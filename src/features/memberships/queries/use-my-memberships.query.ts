import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_MY_MEMBERSHIPS } from './schema';
import { IConnection, IPaginationParams } from '../../../shared';
import { IMembership } from '../shared';

export function useMyMembershipsQuery(params?: IPaginationParams<number>) {
  return useQuery<
    {
      myMemberships: IConnection<IMembership, string>;
    },
    { params?: IPaginationParams<number> }
  >(GET_MY_MEMBERSHIPS, {
    variables: { params },
  });
}

export function useMyMembershipsSuspenseQuery(
  params?: IPaginationParams<number>,
) {
  return useSuspenseQuery<
    {
      myMemberships: IConnection<IMembership, string>;
    },
    { params?: IPaginationParams<number> }
  >(GET_MY_MEMBERSHIPS, {
    variables: { params },
  });
}
