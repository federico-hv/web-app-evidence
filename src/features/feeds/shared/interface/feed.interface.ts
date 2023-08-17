import { FeedReactionName } from '../types';
import { GenericItem, UserModel } from '../../../../shared';
import { ArticleModel, PostModel } from './post.interface';

export interface IReaction {
  name: FeedReactionName;
  count: number;
}

export interface FeedModel extends GenericItem {
  type: 'article' | 'post';
  node: PostModel | ArticleModel;
  reaction: IReaction | null;
  owner: UserModel;
  createdAt: string;
}

export interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}
