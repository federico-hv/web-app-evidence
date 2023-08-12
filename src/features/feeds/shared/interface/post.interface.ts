import { GenericItem, IUser } from '../../../../shared';

interface IArticleSource {
  name: string;
  logo: string;
  url?: string;
}

export interface IPostMedia extends GenericItem {
  url: string;
  type: 'image' | 'video';
}

export interface IPoll extends GenericItem {
  __typename: string;
  text: string;
  voted: boolean;
  count: number;
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
  id: number;
  description: string;
  media?: IPostMedia[];
  polls?: IPoll[];
}

interface FeedModel extends GenericItem {
  type: string;
  node: PostModel | ArticleModel;
  owner: IUser;
  createdAt: number;
}

interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}

export type { FeedModel, PostModel, ArticleModel, FeedsReturnModel };
