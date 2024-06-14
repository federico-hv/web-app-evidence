import { useSuspenseQuery } from '@apollo/client';
import { IRelationshipStatusInfo } from '../../interfaces';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';

export function useRelationshipStatusInfo(username = '') {
  const { data } = useSuspenseQuery<{
    relationshipStatusInfo: IRelationshipStatusInfo;
  }>(GET_RELATIONSHIP_STATUS_INFO, {
    variables: {
      username: username,
    },
  });

  return { data };
}
