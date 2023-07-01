import {
  CreateRelationshipAction,
  RelationshipStatusCode,
  RemoveRelationshipAction,
  RequestRelationshipAction,
} from '../types';

export interface RelationshipModel {
  addresseeId: string;
  code: RelationshipStatusCode;
}

export interface RelationshipStatusInfo {
  isBlocked: boolean | null;
  isMuted: boolean | null;
  isFollower: boolean | null;
  isFollowing: boolean | null;
  isFriend: boolean | null;
  isFavourite: boolean | null;
  isOwned: boolean | null;
  // TODO: currently missing on B.End
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
