import { useMutation } from '@apollo/client';
import {
  ACCEPT_RELATIONSHIP_REQUEST,
  DECLINE_RELATIONSHIP_REQUEST,
} from '../../mutations';
import { GET_RELATIONSHIP_REQUESTS } from '../../queries';
import { RelationshipRequest } from '../../interfaces';

export function useAcceptRelationshipRequest() {
  const [mutation, { loading, error, data }] = useMutation<
    { acceptRelationshipRequest: number },
    { id: number }
  >(ACCEPT_RELATIONSHIP_REQUEST);

  const accept = async (id: number) => {
    await mutation({
      variables: { id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            relationshipRequests(current: RelationshipRequest[]) {
              const id = data?.acceptRelationshipRequest;

              const newData = current.filter((item) => item.id === id);

              cache.writeQuery({
                query: GET_RELATIONSHIP_REQUESTS,
                data: {
                  relationshipRequests: newData,
                },
              });
            },
          },
        });
      },
    });
  };

  return { loading, error, data, accept };
}

export function useDeclineRelationshipRequest() {
  const [mutation, { loading, error, data }] = useMutation<
    { declineRelationshipRequest: number },
    { id: number }
  >(DECLINE_RELATIONSHIP_REQUEST);

  const decline = async (id: number) => {
    await mutation({
      variables: { id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            relationshipRequests(current: RelationshipRequest[]) {
              const id = data?.declineRelationshipRequest;

              const newData = current.filter((item) => item.id === id);

              cache.writeQuery({
                query: GET_RELATIONSHIP_REQUESTS,
                data: {
                  relationshipRequests: newData,
                },
              });
            },
          },
        });
      },
    });
  };

  return { loading, error, data, decline };
}
