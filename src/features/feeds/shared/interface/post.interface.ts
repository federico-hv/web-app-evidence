import { GenericItem, IUser } from '../../../../shared';

interface IArticleSource {
  name: string;
  logo: string;
  url?: string;
}

interface ArticleModel extends GenericItem {
  __typename: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  source: IArticleSource;
}

interface PostModel extends GenericItem {
  __typename: string;
  description: string;
  responses?: never;
}

interface PollResponse extends GenericItem {
  text: string;
}

interface PollModel {
  __typename: string;
  description: string;
  responses: PollResponse[];
}

interface FeedModel extends GenericItem {
  type: string;
  node: PostModel | PollModel | ArticleModel;
  owner: IUser;
  createdAt: number;
}

interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}

export type {
  FeedModel,
  PostModel,
  ArticleModel,
  PollModel,
  FeedsReturnModel,
  PollResponse,
};
