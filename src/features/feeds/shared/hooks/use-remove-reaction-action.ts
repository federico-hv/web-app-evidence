import { useMutation } from '@apollo/client';
import { REMOVE_REACTION } from '../../mutations';
import { FeedReactionName } from '../types';
import { FeedModel, FeedsReturnModel } from '../interface';
import { useToast } from '../../../../shared';
import {
  GET_FEED_STATISTIC,
  GET_FEEDS,
  GET_USER_FEEDS,
} from '../../queries';
import { useParams } from 'react-router-dom';

export function useRemoveReactionAction(): {
  removeReaction: (
    id: string,
    reaction: FeedReactionName,
  ) => Promise<void>;
  removeLove: (id: string) => Promise<void>;
  removeIndifference: (id: string) => Promise<void>;
  removeSadness: (id: string) => Promise<void>;
  removeExcitement: (id: string) => Promise<void>;
  loading: boolean;
} {
  const { openWith } = useToast();
  const { username } = useParams();

  const [mutation, { loading }] = useMutation<
    { removeReaction: FeedModel },
    { id: string; reaction: FeedReactionName }
  >(REMOVE_REACTION);

  const removeReaction = async (
    id: string,
    reaction: FeedReactionName,
  ) => {
    try {
      await mutation({
        variables: {
          id,
          reaction,
        },
        refetchQueries: [
          {
            query: GET_FEED_STATISTIC,
            variables: { id: id, name: 'reactions' },
          },
        ],
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {
                const result: { feeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                  });

                if (result && result.feeds) {
                  const idx = result.feeds.data.findIndex(
                    (item) => item.id === data?.removeReaction.id,
                  );

                  const newData = [
                    ...result.feeds.data.slice(0, idx),
                    data?.removeReaction,
                    ...result.feeds.data.slice(idx + 1),
                  ];

                  // Update get feeds
                  cache.writeQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                    data: {
                      feeds: {
                        __typename: 'FeedReturnModel',
                        count: result.feeds.count,
                        data: newData,
                      },
                    },
                  });
                }
              },
              feed() {
                // TODO: Add feed cache update
              },
              userFeeds() {
                const result: { userFeeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_USER_FEEDS,
                    variables: { username, type: 'post' },
                  });

                if (result && result.userFeeds) {
                  const idx = result.userFeeds.data.findIndex(
                    (item) => item.id === data?.removeReaction.id,
                  );

                  const newData = [
                    ...result.userFeeds.data.slice(0, idx),
                    data?.removeReaction,
                    ...result.userFeeds.data.slice(idx + 1),
                  ];

                  // Update get feeds
                  cache.writeQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                    data: {
                      feeds: {
                        __typename: 'FeedReturnModel',
                        count: result.userFeeds.count,
                        data: newData,
                      },
                    },
                  });
                }
              },
            },
          });
        },
      });
    } catch (err) {
      console.error('Failed to remove reaction.');
      openWith({
        status: 'danger',
        description:
          'Oops! Something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };

  const removeLove = async (id: string) => {
    await removeReaction(id, 'love');
  };
  const removeIndifference = async (id: string) => {
    await removeReaction(id, 'indifferent');
  };
  const removeSadness = async (id: string) => {
    await removeReaction(id, 'sad');
  };
  const removeExcitement = async (id: string) => {
    await removeReaction(id, 'excited');
  };

  return {
    removeReaction,
    removeLove,
    removeIndifference,
    removeSadness,
    removeExcitement,
    loading,
  };
}
