import { useQuery } from '@apollo/client';
import { GET_RELATIONSHIP_COUNT } from '../../queries';

interface ITotal {
  total: number;
}

export function useRelationshipCount(username: string) {
  return useQuery<
    { following: ITotal; followers: ITotal },
    { username: string }
  >(GET_RELATIONSHIP_COUNT, { variables: { username } });
}

export function useSuspenseRelationshipCount(username: string) {
  return useQuery<
    { relationshipCount: { following: ITotal; followers: ITotal } },
    { username: string }
  >(GET_RELATIONSHIP_COUNT, { variables: { username } });
}
