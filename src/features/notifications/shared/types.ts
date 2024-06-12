import { ReactNode } from 'react';
import { GenericItem, UserModel } from 'shared';

export interface RelationshipEntity extends GenericItem {
  // still debating
  username: string;
  id: string;
  type: 'FollowRequest' | 'Follow' | 'AcceptedFollowRequest';
  action: 'accepted' | 'created';
}
export interface FeedEntity extends GenericItem {
  // still debating
  imageSrc: string;
  owner: Omit<UserModel, 'role'>;
  action: 'created' | 'liked' | 'shared';
}

export interface INotification {
  createdAt: Date;
  actor: Omit<UserModel, 'role'>;
  type: NotificationType;
  entity: RelationshipEntity | FeedEntity;
}

export type NotificationType = 'relationship' | 'feed';

export type NotificationDetailsProps = {
  name: string;
  description: string;
  date: Date;
};

export type NotificationActionWrapperProps = {
  children: ReactNode;
};

export type NotificationItemSCName =
  | 'NotificationItemAvatar'
  | 'NotificationItemDetails'
  | 'NotificationItemMediaItem'
  | 'NotificationItemActionWrapper';
