import { useMutation } from '@apollo/client';
import {
  RemoveRelationshipInput,
  RemoveRelationshipModel,
} from '../../interfaces';
import { REMOVE_RELATIONSHIP } from '../../../mutations';
import {
  GET_BLOCKED_ACCOUNTS,
  GET_MUTED_ACCOUNTS,
  GET_RELATIONSHIP_STATUS_INFO,
} from '../../../queries';
import { GET_RELATIONSHIP_COUNT } from '../../../../../pages/profile/queries';

export function useRemoveRelationship() {
  const [mutation, { loading, error }] = useMutation<
    { removeRelationship: RemoveRelationshipModel },
    {
      payload: RemoveRelationshipInput;
    }
  >(REMOVE_RELATIONSHIP);

  const removeRelationship = async (payload: RemoveRelationshipInput) => {
    await mutation({
      variables: {
        payload,
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            relationshipStatusInfo(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_STATUS_INFO,
                data: {
                  relationshipStatusInfo: {
                    ...current,
                    ...data?.removeRelationship,
                  },
                },
              });
            },
            blockedUsers(current) {
              cache.writeQuery({
                query: GET_BLOCKED_ACCOUNTS,
                data: {
                  blockedUsers: {
                    ...current,
                  },
                },
              });
            },
            mutedUsers(current) {
              cache.writeQuery({
                query: GET_MUTED_ACCOUNTS,
                data: {
                  mutedUsers: {
                    ...current,
                  },
                },
              });
            },
            relationshipCount(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_COUNT,
                data: {
                  relationshipCount: current,
                },
              });
            },
          },
        });
      },
    });
  };

  return { removeRelationship, loading, error };
}
