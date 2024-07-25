import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { DELETE_FEED } from './schema';

export function useDeleteFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { deleteFeed: string },
    { id: string }
  >(DELETE_FEED);

  const deleteFeed = async (id: string) => {
    try {
      return await mutation({
        variables: { id },
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

  return { deleteFeed, loading, error };
}
