import { DocumentNode, useQuery } from '@apollo/client';
import { Followers, Following, Mutual, QueryType } from '../../types';
import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_MUTUAL_USERS,
} from '../../../queries';

const Query: Record<QueryType, DocumentNode> = {
  followers: GET_FOLLOWERS,
  following: GET_FOLLOWING,
  mutualUsers: GET_MUTUAL_USERS,
};

export function useRelationshipUsers(type: QueryType, username: string) {
  const { data, loading, error } = useQuery<
    Followers | Following | Mutual
  >(Query[type], { variables: { username } });

  return { data, loading, error };
}
