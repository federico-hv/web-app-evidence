import { useMutation } from '@apollo/client';
import { GET_RELATIONSHIP_STATUS_INFO } from '../../../queries';
import { REMOVE_FOLLOWER } from '../../../mutations';

export function useRemoveFollower() {
  const [mutation, { loading, error }] = useMutation<
    { removeFollower: boolean },
    { username: string }
  >(REMOVE_FOLLOWER);

  const removeFollower = async (username: string) => {
    await mutation({
      variables: { username },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            relationshipStatusInfo(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_STATUS_INFO,
                data: {
                  relationshipStatusInfo: {
                    ...current,
                    isFollower: data?.removeFollower,
                  },
                },
              });
            },
          },
        });
      },
    });
  };

  return { removeFollower, loading, error };
}
