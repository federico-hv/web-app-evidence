import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../mutations';
import { FeedReactionName } from '../types';
import { FeedModel, FeedsReturnModel } from '../interface';
import { useToast } from '../../../../shared';
import {
  GET_FEED_STATISTIC,
  GET_FEEDS,
  GET_USER_FEEDS,
} from '../../queries';
import { useParams } from 'react-router-dom';

/*
  TODO: Deprecate
 */

export function useAddReactionAction(): {
  addReaction: (id: string, reaction: FeedReactionName) => Promise<void>;
  love: (id: string) => Promise<void>;
  indifference: (id: string) => Promise<void>;
  saddened: (id: string) => Promise<void>;
  excited: (id: string) => Promise<void>;
  loading: boolean;
} {
  const { openWith } = useToast();
  const { username } = useParams();

  const [mutation, { loading }] = useMutation<
    { addReaction: FeedModel },
    { id: string; reaction: FeedReactionName }
  >(ADD_REACTION);

  const addReaction = async (
    id: string,
    reaction: FeedReactionName,
  ): Promise<void> => {
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
                    (item) => item.id === data?.addReaction.id,
                  );

                  const newData = [
                    ...result.feeds.data.slice(0, idx),
                    data?.addReaction,
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
                    (item) => item.id === data?.addReaction.id,
                  );

                  const newData = [
                    ...result.userFeeds.data.slice(0, idx),
                    data?.addReaction,
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
      if (import.meta.env.DEV) {
        console.error(err);
      }
      openWith({
        status: 'danger',
        description:
          'Oops! Something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };

  const love = async (id: string) => {
    await addReaction(id, 'love');
  };
  const indifference = async (id: string) => {
    await addReaction(id, 'indifferent');
  };
  const saddened = async (id: string) => {
    await addReaction(id, 'sad');
  };
  const excited = async (id: string) => {
    await addReaction(id, 'excited');
  };

  return { addReaction, love, indifference, saddened, excited, loading };
}
