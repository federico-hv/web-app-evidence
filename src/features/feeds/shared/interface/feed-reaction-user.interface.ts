import { FeedReactionName } from '../types';
import { UserModel } from '../../../../shared';

export interface IFeedReactionUser {
  name: FeedReactionName;
  user: UserModel;
}
