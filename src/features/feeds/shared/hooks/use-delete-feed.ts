import { useMutation } from '@apollo/client';
import { DELETE_FEED } from '../../mutations';
import { useToast } from '../../../../shared';

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
              },
              trendingFeeds() {
                if (!data) return;
              },
            },
          });
        },
      });

      openWith({
        status: 'success',
        description: 'Successfully deleted feed.',
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
