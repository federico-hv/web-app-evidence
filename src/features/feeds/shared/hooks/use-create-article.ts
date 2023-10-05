import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE } from '../../mutations';
import { FeedModel } from '../interface';
import { CreateArticleInput } from '../interface';
import { GET_FEEDS } from '../../queries';
import { useToast } from '../../../../shared';

export function useCreateArticle() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { createArticle: FeedModel },
    { payload: CreateArticleInput }
  >(CREATE_ARTICLE);

  const createArticle = async (payload: CreateArticleInput) => {
    return mutation({
      variables: { payload },
      refetchQueries: [
        { query: GET_FEEDS, variables: { type: 'all' } },
        { query: GET_FEEDS, variables: { type: 'article' } },
      ],
    });
  };

  if (error) {
    openWith({
      status: 'danger',
      description: 'Oops, something went wrong. Please try again later.',
    });
  }

  return { loading, error, createArticle };
}
