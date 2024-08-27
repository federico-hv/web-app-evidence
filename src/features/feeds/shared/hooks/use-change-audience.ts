import { useMutation } from '@apollo/client';
import { CHANGE_AUDIENCE } from '../../mutations';
import { IStatus, useToast } from '../../../../shared';
import { GET_FEED_AUDIENCE } from '../../queries';
import { FeedAudienceEnum } from '../enum';

export function useChangeAudience() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    { changeAudience: IStatus },
    { id: string; audience: FeedAudienceEnum }
  >(CHANGE_AUDIENCE);

  const changeAudience = async (
    id: string,
    audience: FeedAudienceEnum,
  ) => {
    try {
      await mutation({
        variables: { id, audience },
        refetchQueries: [{ query: GET_FEED_AUDIENCE, variables: { id } }],
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

  return { changeAudience, loading, error };
}
