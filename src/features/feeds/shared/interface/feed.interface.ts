import { FeedReactionName } from '../types';
import { GenericItem, IUser } from '../../../../shared';
import { ArticleModel, PostModel } from './post.interface';

export interface IReaction {
  name: FeedReactionName;
  count: number;
}

export interface FeedModel extends GenericItem {
  type: string;
  node: PostModel | ArticleModel;
  reaction: IReaction | null;
  owner: IUser;
  createdAt: string;
}

export interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}
