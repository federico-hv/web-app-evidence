import { FeedReactionName } from '../types';
import { GenericItem, UserModel } from '../../../../shared';
import { ArticleModel, PostModel } from './post.interface';

export interface FeedModel extends GenericItem {
  type: 'article' | 'post';
  isPinned: boolean;
  node: PostModel | ArticleModel;
  reaction: FeedReactionName | null;
  bookmarked: boolean;
  owner: UserModel;
  createdAt: string;
}

export interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}
