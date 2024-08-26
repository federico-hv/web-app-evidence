import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_MY_MEMBERS } from './schema';
import {
  IConnection,
  IPaginationParams,
  OrderByEnum,
} from '../../../shared';
import { IExpandedClubMember, MembersSortByEnum } from '../shared';

export interface IMyMembersResponse {
  myMembers: IConnection<IExpandedClubMember, number>;
}

export interface IMyMembersArgs {
  params?: IPaginationParams<number>;
  sortBy?: MembersSortByEnum;
  sortOrder?: OrderByEnum;
}

export function useMyMembersQuery() {
  return useQuery<IMyMembersResponse, IMyMembersArgs>(GET_MY_MEMBERS);
}

export function useMyMembersSuspenseQuery() {
  return useSuspenseQuery<IMyMembersResponse, IMyMembersArgs>(
    GET_MY_MEMBERS,
  );
}
