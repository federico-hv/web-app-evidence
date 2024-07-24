import { ErrorMessage, IStatus, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { FeedAudienceName } from '../shared';
import { CHANGE_AUDIENCE } from './schema';
import { GET_FEED_AUDIENCE } from '../queries';

export function useChangeAudienceMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { changeAudience: IStatus },
    { id: string; audience: FeedAudienceName }
  >(CHANGE_AUDIENCE);

  const changeAudience = async (
    id: string,
    audience: FeedAudienceName,
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
        description: ErrorMessage.Any,
      });
    }
  };

  return { changeAudience, loading, error };
}
