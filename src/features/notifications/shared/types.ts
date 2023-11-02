import { ReactNode } from 'react';
import { GenericItem, UserModel } from 'shared';

export interface RelationshipEntity extends GenericItem {
  // still debating
  username: string;
  id: string;
  type: 'FollowRequest' | 'Follow' | 'AcceptedFollowRequest';
  action: 'accepted' | 'requested';
}
export interface FeedEntity extends GenericItem {
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

export type NotificationDetailsProps = {
  name: string;
  description: string;
  date: Date;
};

export type NotificationActionWrapperProps = {
  children: ReactNode;
};

export type NotificationSCName =
  | 'NotificationAvatar'
  | 'NotificationDetails'
  | 'NotificationMediaItem'
  | 'NotificationActionWrapper';
