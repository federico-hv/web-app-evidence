import { DocumentNode, useSuspenseQuery } from '@apollo/client';
import { QueryType } from '../../types';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_MUTUAL_USERS,
} from '../../../queries';
import { IFetchUsersResponse, UserModel } from '../../../../../shared';

const Query: Record<QueryType, DocumentNode> = {
  followers: GET_FOLLOWERS,
  following: GET_FOLLOWING,
  mutualUsers: GET_MUTUAL_USERS,
};

export function useRelationshipUsers(
  type: QueryType,
  username: string,
): { users: UserModel[]; total: number } {
  const { data } = useSuspenseQuery<
    Record<QueryType, IFetchUsersResponse>,
    { username: string }
  >(Query[type], {
    variables: { username },
  });

  return {
    users: data[type].users,
    total: data[type].total,
  };
}
