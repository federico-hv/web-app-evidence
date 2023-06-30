import { useMutation } from '@apollo/client';
import {
  CreateRelationshipInput,
  RelationshipModel,
} from '../../interfaces';
import { CREATE_RELATIONSHIP } from '../../mutations';
import { GET_RELATIONSHIP } from '../../queries';

export function useCreateRelationship() {
  const [mutation, { loading, error, data }] = useMutation<
    { createRelationship: RelationshipModel },
    { payload: CreateRelationshipInput }
  >(CREATE_RELATIONSHIP);

  const createRelationship = async (payload: CreateRelationshipInput) => {
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
                data: { relationship: data?.createRelationship },
              });
            },
          },
        });
      },
    });
  };

  return { createRelationship, loading, error, data };
}
