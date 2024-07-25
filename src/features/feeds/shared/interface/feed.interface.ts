import { GenericItem, UserModel } from '../../../../shared';
import { ArticleModel, PostModel } from './post.interface';

export interface FeedModel extends GenericItem {
  type: 'article' | 'post';
  isLiked: boolean;
  isBookmarked: boolean;
  isPinned: boolean;
  item: PostModel | ArticleModel;
  owner: UserModel;
  createdAt: string;
}

export interface FeedsReturnModel {
  count: number;
  data: FeedModel[];
}
