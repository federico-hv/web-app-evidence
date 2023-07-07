import {
  CreateRelationshipAction,
  RemoveRelationshipAction,
  RequestRelationshipAction,
} from '../types';

export interface RelationshipRequest {
  id: number;
  requestType: 'hasFollowRequest' | 'hasFriendRequest';
  requester: {
    id: string;
    avatar: string;
    username: string;
    displayName: string;
  };
}

export interface RelationshipStatusInfo {
  isBlocked: boolean | null;
  isRestricted: boolean | null;
  isMuted: boolean | null;
  isFollower: boolean | null;
  isFollowing: boolean | null;
  isFriend: boolean | null;
  isFavourite: boolean | null;
  isOwned: boolean | null;
  hasFriendRequest: boolean | null;
  hasFollowRequest: boolean | null;
}

export interface CreateRelationshipModel {
  isBlocked: boolean | null;
  isMuted: boolean | null;
  isFollowing: boolean | null;
  isFavourite: boolean | null;
}

export interface RequestRelationshipModel {
  hasFriendRequest: boolean | null;
  hasFollowRequest: boolean | null;
}

export interface RemoveRelationshipModel {
  isBlocked: boolean | null;
  isMuted: boolean | null;
  isFollowing: boolean | null;
  isFriend: boolean | null;
  isFavourite: boolean | null;
}

export interface CreateRelationshipInput {
  username: string;
  action: CreateRelationshipAction;
}

export interface RemoveRelationshipInput {
  username: string;
  action: RemoveRelationshipAction;
}

export interface RequestRelationshipInput {
  username: string;
  action: RequestRelationshipAction;
}
