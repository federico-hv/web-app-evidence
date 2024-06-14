import { useMutation } from '@apollo/client';
import {
  RemoveRelationshipInput,
  RemoveRelationshipModel,
} from '../../interfaces';
import { REMOVE_RELATIONSHIP } from '../../../mutations';
import {
  GET_BLOCKED_ACCOUNTS,
  GET_MUTED_ACCOUNTS,
  GET_RELATIONSHIP_COUNT,
  GET_RELATIONSHIP_STATUS_INFO,
} from '../../../queries';
import { omit } from 'lodash';

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
      refetchQueries: [
        {
          query: GET_RELATIONSHIP_COUNT,
          variables: { username: payload.username },
        },
      ],
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            relationshipStatusInfo(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_STATUS_INFO,
                data: {
                  relationshipStatusInfo: {
                    isBlocked: null,
                    isMuted: null,
                    isFollower: null,
                    isFollowing: null,
                    isRestricted: null,
                    hasFollowRequest: null,
                    ...current,
                    ...omit(data?.removeRelationship, '__typename'),
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
            // followers(current) {
            //   cache.writeQuery({
            //     query: GET_RELATIONSHIP_COUNT,
            //     data: {
            //       followers: current - 1,
            //       following: current, // Bug: might get bug here
            //     },
            //   });
            // },
          },
        });
      },
    });
  };

  return { removeRelationship, loading, error };
}
