import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../shared';
import { PIN_FEED } from './schema';

export function usePinFeedMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    string,
    { id: string }
  >(PIN_FEED);

  const pin = async (id: string) => {
    try {
      await mutation({
        variables: { id },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {},
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

  return { pin, loading, error };
}
