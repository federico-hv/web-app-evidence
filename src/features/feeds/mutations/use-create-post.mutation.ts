import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { CreatePostInput, FeedFilterTypeEnum, FeedModel } from '../shared';
import { CREATE_POST } from './schema';
import { GET_FEEDS } from '../queries';

export function useCreatePostMutation() {
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
        refetchQueries: [
          {
            query: GET_FEEDS,
            variables: { filter: FeedFilterTypeEnum.All },
          },
          {
            query: GET_FEEDS,
            variables: { filter: FeedFilterTypeEnum.Posts },
          },
        ],
        context: {
          headers: {
            'apollo-require-preflight': true,
          },
        },
      });
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);

      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { createPost, loading, error };
}
