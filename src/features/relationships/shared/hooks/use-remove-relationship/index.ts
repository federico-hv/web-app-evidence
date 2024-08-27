import { useMutation } from '@apollo/client';
import {
  RemoveRelationshipInput,
  RemoveRelationshipModel,
} from '../../interfaces';
import { REMOVE_RELATIONSHIP } from '../../../mutations';
import {
  GET_BLOCKED_USERS,
  GET_MUTED_USERS,
  GET_RELATIONSHIP_COUNT,
  GET_RELATIONSHIP_STATUS_INFO,
} from '../../../queries';
import { omit } from 'lodash';
import {
  FeedFilterTypeEnum,
  GET_FEEDS,
  GET_TRENDING_FEEDS,
} from '../../../../feeds';

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
          query: GET_FEEDS,
          variables: { filter: FeedFilterTypeEnum.All },
        },
        {
          query: GET_FEEDS,
          variables: { filter: FeedFilterTypeEnum.Polls },
        },
        {
          query: GET_TRENDING_FEEDS,
          variables: { filter: FeedFilterTypeEnum.All },
        },
        {
          query: GET_TRENDING_FEEDS,
          variables: { filter: FeedFilterTypeEnum.Polls },
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
                query: GET_BLOCKED_USERS,
                data: {
                  blockedUsers: {
                    ...current,
                  },
                },
              });
            },
            mutedUsers(current) {
              cache.writeQuery({
                query: GET_MUTED_USERS,
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
