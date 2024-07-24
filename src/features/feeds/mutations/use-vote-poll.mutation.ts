import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { PostModel } from '../shared';
import { VOTE_POLL } from './schema';

export function useVotePollMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { votePoll: PostModel },
    { id: number; pollId: number }
  >(VOTE_POLL);

  const votePoll = async (postId: number, pollId: number) => {
    try {
      return await mutation({
        variables: {
          id: postId,
          pollId,
        },
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

  return { votePoll, error, loading };
}
