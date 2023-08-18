import { useMutation } from '@apollo/client';
import { DELETE_FEED } from '../../mutations';
import { useToast } from '../../../../shared';
import { GET_FEEDS, GET_USER_FEEDS } from '../../queries';
import { FeedsReturnModel } from '../interface';

export function useDeleteFeed() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    { deleteFeed: string },
    { id: string }
  >(DELETE_FEED);

  const deleteFeed = async (id: string) => {
    try {
      await mutation({
        variables: { id },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {
                if (!data) return;
                /**/
                const result: { feeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                  });

                if (result) {
                  const newData = result.feeds.data.filter(
                    (item) => item.id === data.deleteFeed,
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
                    query: GET_USER_FEEDS,
                    variables: { type: 'post' },
                  });

                if (result) {
                  const newData = result.feeds.data.filter(
                    (item) => item.id === data.deleteFeed,
                  );

                  cache.writeQuery({
                    query: GET_USER_FEEDS,
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

  return { deleteFeed, loading, error };
}
