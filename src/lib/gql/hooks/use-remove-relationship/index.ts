import { useMutation } from '@apollo/client';
import {
  RemoveRelationshipInput,
  RemoveRelationshipModel,
} from '../../interfaces';
import { REMOVE_RELATIONSHIP } from '../../mutations';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../queries';

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
          },
        });
      },
    });
  };

  return { removeRelationship, loading, error };
}
