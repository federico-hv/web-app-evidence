import { useMutation } from '@apollo/client';
import {
  RequestRelationshipInput,
  RequestRelationshipModel,
} from '../../interfaces';
import { REQUEST_RELATIONSHIP } from '../../../mutations';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';

export function useRequestRelationship() {
  const [mutation, { loading, error, data }] = useMutation<
    { requestRelationship: RequestRelationshipModel },
    { payload: RequestRelationshipInput }
  >(REQUEST_RELATIONSHIP);

  const requestRelationship = async (
    payload: RequestRelationshipInput,
  ) => {
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
                    ...data?.requestRelationship,
                  },
                },
              });
            },
          },
        });
      },
    });
  };

  return { requestRelationship, loading, error, data };
}
