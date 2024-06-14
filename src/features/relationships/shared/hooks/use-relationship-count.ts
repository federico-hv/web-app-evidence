import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_RELATIONSHIP_COUNT } from '../../queries';

interface ITotal {
  total: number;
}

export function useRelationshipCount(username: string) {
  return useQuery<
    { relationshipCount: { following: number; followers: number } },
    { username: string }
  >(GET_RELATIONSHIP_COUNT, { variables: { username } });
}

export function useSuspenseRelationshipCount(username: string) {
  return useSuspenseQuery<
    { relationshipCount: { following: number; followers: number } },
    { username: string }
  >(GET_RELATIONSHIP_COUNT, { variables: { username } });
}
