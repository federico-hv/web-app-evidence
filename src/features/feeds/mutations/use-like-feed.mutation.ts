import { useMutation } from '@apollo/client';
import { LIKE_FEED } from './schema';
import { FeedModel } from '../shared';
import { GET_FEED_STATISTIC } from '../queries';
import { ErrorMessage, useToast } from '../../../shared';

export function useLikeFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { likeFeed: FeedModel },
    { id: string }
  >(LIKE_FEED);

  const likeFeed = async (id: string) => {
    try {
      return await mutation({
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
                console.log('coming soon...');
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

  return { likeFeed, loading, error };
}
