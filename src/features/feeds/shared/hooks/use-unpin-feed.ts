import { useMutation } from '@apollo/client';
import { UNPIN_FEED } from '../../mutations';
import { useToast } from '../../../../shared';
import { FeedModel } from '../interface';
import { GET_FEED } from '../../queries';

export function useUnpinFeed() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    string,
    { id: string }
  >(UNPIN_FEED);

  const unpin = async (id: string) => {
    try {
      await mutation({
        variables: { id },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feed() {
                const result: { feed: FeedModel } | null = cache.readQuery(
                  {
                    query: GET_FEED,
                    variables: { id: data },
                  },
                );

                if (result) {
                  cache.writeQuery({
                    query: GET_FEED,
                    variables: { id },
                    data: {
                      ...result,
                    },
                  });
                }
              },
              feeds() {
                // HARDCORE
              },
              userFeeds() {
                // HARDCORE
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
          'Oops, something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };

  return { unpin, loading, error };
}
