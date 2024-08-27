import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { DELETE_FEED } from './schema';
import { FeedModel } from '../shared';

export function useDeleteFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { deleteFeed: FeedModel },
    { id: string }
  >(DELETE_FEED);

  const deleteFeed = async (id: string) => {
    try {
      return await mutation({
        variables: { id },
        update: (cache) => {
          cache.modify({
            fields: {
              feeds(current = {}) {
                cache.evict({ id: current.__ref });

                return;
              },
              trendingFeeds(current = {}) {
                cache.evict({ id: current.__ref });

                return;
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
        description: ErrorMessage.Any,
      });
    }
  };

  return { deleteFeed, loading, error };
}
