import {
  CreateArticleInput,
  CreatePostInput,
  FeedAudienceEnum,
} from '../../../../shared';

export const defaultPostState: CreatePostInput = {
  audience: FeedAudienceEnum.Everyone,
  description: '',
};

export const defaultArticleState: CreateArticleInput = {
  audience: FeedAudienceEnum.Everyone,
  imageUrl: '',
  title: '',
  description: '',
  url: '',
  site: {
    name: '',
    logo: '',
  },
};
