import { GenericItem, UserModel } from 'shared';

interface RelationshipEntity extends GenericItem {
  // still debating
  username: string;
  id: string;
  type: 'FollowRequest' | 'Follow' | 'AcceptedFollowRequest';
  action: 'accepted' | 'created';
}
interface FeedEntity extends GenericItem {
  // still debating
  imageSrc: string;
  owner: UserModel;
  action: 'created' | 'liked' | 'shared';
}

export interface Notification {
  createdAt: Date;
  actor: UserModel;
  type: NotificationType;
  entity: RelationshipEntity | FeedEntity;
}

export type NotificationType = 'relationship' | 'feed';
