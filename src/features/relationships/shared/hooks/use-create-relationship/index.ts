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
import {
  FeedFilterTypeEnum,
  GET_FEEDS,
  GET_TRENDING_FEEDS,
} from '../../../../feeds';
import { useToast } from '../../../../../shared';

export function useCreateRelationship() {
  const [mutation, { loading, error, data }] = useMutation<
    { createRelationship: CreateRelationshipModel },
    { payload: CreateRelationshipInput }
  >(CREATE_RELATIONSHIP);

  const { openWith } = useToast();

  const createRelationship = async (payload: CreateRelationshipInput) => {
    try {
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
                      ...omit(data, '__typename'),
                    },
                  },
                });
              },
              // followers(current) {
              //   cache.writeQuery({
              //     query: GET_RELATIONSHIP_COUNT,
              //     data: {
              //       followers: current + 1,
              //       following: current, // Bug: might get bug here
              //     },
              //   });
              // },
            },
          });
        },
      });
    } catch (e: any) {
      console.error(e);

      openWith({
        status: 'danger',
        description:
          'Oops! Something went wrong. Totally our fault, but try again later.',
      });
    }
  };

  return { createRelationship, loading, error, data };
}
