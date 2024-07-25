import { useToast } from '../../../../shared';
import { useMutation } from '@apollo/client';
import { HIDE_FEED } from '../../mutations';
import { FeedsReturnModel } from '../interface';
import { GET_FEEDS } from '../../queries';

export function useHideFeed() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    { hideFeed: string },
    { id: string; reason: string }
  >(HIDE_FEED);
  const hideFeed = async (id: string, reason: string) => {
    try {
      await mutation({
        variables: { id, reason },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {
                if (!data) return;
                const result: { feeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                  });

                if (result) {
                  const newData = result.feeds.data.filter(
                    (item) => item.id === data.hideFeed,
                  );

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
              userFeeds() {
                if (!data) return;
                /**/
                const result: { feeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_FEEDS,
                    variables: { type: 'post' },
                  });

                if (result) {
                  const newData = result.feeds.data.filter(
                    (item) => item.id === data.hideFeed,
                  );

                  cache.writeQuery({
                    query: GET_FEEDS,
                    variables: { type: 'post' },
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
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description:
          'Oops, something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };
  return { hideFeed, loading, error };
}
