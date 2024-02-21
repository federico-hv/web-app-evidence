import { useMutation } from '@apollo/client';
import { FeedModel, FeedsReturnModel } from '../interface';
import { UNLIKE_FEED } from '../../mutations';
import { useParams } from 'react-router-dom';
import {
  GET_FEED_STATISTIC,
  GET_FEEDS,
  GET_USER_FEEDS,
} from '../../queries';

export function useUnlikeFeed() {
  const [mutation, { loading, data, error }] = useMutation<
    { unlikeFeed: FeedModel },
    { id: string }
  >(UNLIKE_FEED);
  const { username } = useParams();

  const unlikeFeed = async (id: string) => {
    await mutation({
      variables: { id },
      refetchQueries: [
        {
          query: GET_FEED_STATISTIC,
          variables: { id: id, name: 'love' },
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
                  (item) => item.id === data?.unlikeFeed.id,
                );

                const newData = [
                  ...result.feeds.data.slice(0, idx),
                  data?.unlikeFeed,
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
                  (item) => item.id === data?.unlikeFeed.id,
                );

                const newData = [
                  ...result.userFeeds.data.slice(0, idx),
                  data?.unlikeFeed,
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
  };

  return { unlikeFeed, loading, error, data };
}
