import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE } from '../../mutations';
import { FeedModel } from '../interface';
import { CreateArticleInput } from '../interface';
import { GET_FEEDS } from '../../queries';

export function useCreateArticle() {
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

  return { loading, error, createArticle };
}
