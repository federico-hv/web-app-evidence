import { useMutation } from '@apollo/client';
import { FeedModel, FeedsReturnModel } from '../interface';
import { LIKE_FEED } from '../../mutations';
import {
  GET_FEED_STATISTIC,
  GET_FEEDS,
  GET_USER_FEEDS,
} from '../../queries';
import { useParams } from 'react-router-dom';

export function useLikeFeed() {
  const [mutation, { loading, data, error }] = useMutation<
    { likeFeed: FeedModel },
    { id: string }
  >(LIKE_FEED);
  const { username } = useParams();

  const likeFeed = async (id: string) => {
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
                  (item) => item.id === data?.likeFeed.id,
                );

                const newData = [
                  ...result.feeds.data.slice(0, idx),
                  data?.likeFeed,
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
                  (item) => item.id === data?.likeFeed.id,
                );

                const newData = [
                  ...result.userFeeds.data.slice(0, idx),
                  data?.likeFeed,
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

  return { likeFeed, loading, error, data };
}
