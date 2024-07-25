import { useMutation } from '@apollo/client';
import { FeedModel } from '../shared';
import { UNLIKE_FEED } from './schema';
import { GET_FEED_STATISTIC } from '../queries';
import { ErrorMessage, useToast } from '../../../shared';

export function useUnlikeFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { unlikeFeed: FeedModel },
    { id: string }
  >(UNLIKE_FEED);

  const unlikeFeed = async (id: string) => {
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
                console.log('');
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

  return { unlikeFeed, loading, error };
}
