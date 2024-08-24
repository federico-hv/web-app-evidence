import {
  IConnection,
  IPaginationParams,
  UserModel,
} from '../../../shared';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_MEMBERS } from './schema';

export function useClubMembersQuery(
  clubId: string,
  params?: IPaginationParams<string>,
) {
  return useQuery<
    { clubMembers: IConnection<UserModel, string> },
    { clubId: string; params?: IPaginationParams<string> }
  >(GET_CLUB_MEMBERS, {
    variables: {
      clubId,
      params,
    },
  });
}

export function useClubMembersSuspenseQuery(
  clubId: string,
  params?: IPaginationParams<string>,
) {
  return useSuspenseQuery<
    { clubMembers: IConnection<UserModel, string> },
    { clubId: string; params?: IPaginationParams<string> }
  >(GET_CLUB_MEMBERS, {
    variables: {
      clubId,
      params,
    },
  });
}
