import { useMutation } from '@apollo/client';
import { CREATE_RELATIONSHIP } from '../../../mutations';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';
import {
  CreateRelationshipInput,
  CreateRelationshipModel,
} from '../../interfaces';
import { GET_RELATIONSHIP_COUNT } from '../../../../../pages/profile/queries';

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

  return { createRelationship, loading, error, data };
}
