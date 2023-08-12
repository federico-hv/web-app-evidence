import { useQuery } from '@apollo/client';
import { RelationshipStatusInfo } from '../../interfaces';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';

export function useRelationshipStatusInfo(username = '') {
  const { data, loading, error } = useQuery<{
    relationshipStatusInfo: RelationshipStatusInfo;
  }>(GET_RELATIONSHIP_STATUS_INFO, {
    variables: {
      username: username,
    },
  });

  return { data, loading, error };
}
