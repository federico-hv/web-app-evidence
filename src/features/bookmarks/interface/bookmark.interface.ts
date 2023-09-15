import { GenericItem } from '../../../shared';
import { FeedModel } from '../../feeds';

export interface IBookmark extends GenericItem {
  id: number;
  feed: FeedModel;
}
