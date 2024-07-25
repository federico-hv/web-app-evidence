import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { HIDE_FEED } from './schema';

export function useHideFeedMutation() {
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
  return { hideFeed, loading, error };
}
