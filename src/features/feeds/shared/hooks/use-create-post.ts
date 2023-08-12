import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../mutations';
import { CreatePostInput, FeedModel } from '../interface';
import { useToast } from '../../../../shared';

/**
 *
 */
export function useCreatePost() {
  const { openWith } = useToast();
  const [mutation, { loading, error }] = useMutation<
    { createPost: FeedModel },
    { payload: CreatePostInput }
  >(CREATE_POST);

  const createPost = async (payload: CreatePostInput) => {
    try {
      return await mutation({
        variables: {
          payload,
        },
        context: {
          headers: {
            'apollo-require-preflight': true,
          },
        },
      });
    } catch (err) {
      console.log(
        'Failed to send data to create a post. Probably a payload issue.',
      );
      openWith({
        status: 'danger',
        description:
          'Oops, something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };

  return { createPost, loading, error };
}
