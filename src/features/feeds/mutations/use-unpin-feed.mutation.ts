import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { UNPIN_FEED } from './schema';

export function useUnpinFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    string,
    { id: string }
  >(UNPIN_FEED);

  const unpin = async (id: string) => {
    try {
      return await mutation({
        variables: { id },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {
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
        description: ErrorMessage.Any,
      });
    }
  };

  return { unpin, loading, error };
}
