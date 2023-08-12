import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE } from '../../mutations';
import { FeedModel } from '../interface';
import { CreateArticleInput } from '../interface';

export function useCreateArticle() {
  const [mutation, { loading, error }] = useMutation<
    { createArticle: FeedModel },
    { payload: CreateArticleInput }
  >(CREATE_ARTICLE);

  const createArticle = async (payload: CreateArticleInput) => {
    return mutation({
      variables: { payload },
    });
  };

  return { loading, error, createArticle };
}
