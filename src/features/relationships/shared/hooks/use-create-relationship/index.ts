import { useMutation } from '@apollo/client';
import { CREATE_RELATIONSHIP } from '../../../mutations';
import {
  GET_RELATIONSHIP_STATUS_INFO,
  GET_RELATIONSHIP_COUNT,
} from '../../../queries';
import {
  CreateRelationshipInput,
  CreateRelationshipModel,
} from '../../interfaces';
import { omit } from 'lodash';
import { GET_FEEDS } from '../../../../feeds';

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
      refetchQueries: [{ query: GET_FEEDS, variables: { type: 'all' } }],
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
                    isFriend: null,
                    isFavourite: null,
                    isRestricted: null,
                    hasFriendRequest: null,
                    hasFollowRequest: null,
                    isOwned: null,
                    ...current,
                    ...omit(data, '__typename'),
                  },
                },
              });
            },
            followers(current) {
              cache.writeQuery({
                query: GET_RELATIONSHIP_COUNT,
                data: {
                  followers: {
                    total: current.total + 1,
                  },
                  following: {
                    total: current.total, // Bug: might get bug here
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
