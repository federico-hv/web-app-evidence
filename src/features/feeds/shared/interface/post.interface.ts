import { GenericItem } from '../../../../shared';
import { FeedFilterTypeEnum } from '../enum';

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
  id: number;
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
  type: 'poll' | 'post';
  description: string;
  endDate?: Date | null;
  media?: IPostMedia[];
  polls?: IPoll[];
}

export type { PostModel, ArticleModel, IArticleSource };
