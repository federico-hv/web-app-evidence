import { CreateArticleInput, CreatePostInput } from '../../../../shared';

export const defaultPostState: CreatePostInput = {
  description: '',
};

export const defaultArticleState: CreateArticleInput = {
  imageUrl: '',
  title: '',
  description: '',
  url: '',
  site: {
    name: '',
    logo: '',
  },
};
