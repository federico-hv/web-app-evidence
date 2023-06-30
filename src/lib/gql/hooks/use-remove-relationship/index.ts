import { useMutation } from '@apollo/client';
import {
  RelationshipModel,
  RemoveRelationshipInput,
} from '../../interfaces';
import { REMOVE_RELATIONSHIP } from '../../mutations';
import { GET_RELATIONSHIP } from '../../queries';

export function useRemoveRelationship() {
  const [mutation, { loading, error }] = useMutation<
    { removeRelationship: RelationshipModel },
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
            relationship() {
              cache.writeQuery({
                query: GET_RELATIONSHIP,
                data: { relationship: data?.removeRelationship },
              });
            },
          },
        });
      },
    });
  };

  return { removeRelationship, loading, error };
}
