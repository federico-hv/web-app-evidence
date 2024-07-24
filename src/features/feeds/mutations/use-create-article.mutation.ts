import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { CreateArticleInput, FeedModel } from '../shared';
import { CREATE_ARTICLE } from './schema';
import { GET_FEEDS } from '../queries';

export function useCreateArticleMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { createArticle: FeedModel },
    { payload: CreateArticleInput }
  >(CREATE_ARTICLE);

  const createArticle = async (payload: CreateArticleInput) => {
    try {
      return mutation({
        variables: { payload },
        refetchQueries: [
          { query: GET_FEEDS, variables: { filter: 'all' } },
          { query: GET_FEEDS, variables: { filter: 'article' } },
        ],
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

  return { loading, error, createArticle };
}
