import { useMutation } from '@apollo/client';
import { CREATE_RELATIONSHIP } from '../../../mutations';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';
import {
  CreateRelationshipInput,
  CreateRelationshipModel,
} from '../../interfaces';

export function useCreateRelationship() {
  const [mutation, { loading, error, data }] = useMutation<
    { createRelationship: CreateRelationshipModel },
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
            relationshipStatusInfo(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_STATUS_INFO,
                data: {
                  relationshipStatusInfo: {
                    ...current,
                    ...data?.createRelationship,
                  },
                },
              });
            },
          },
        });
      },
    });
  };

  return { createRelationship, loading, error, data };
}
