import {
  CreateRelationshipAction,
  RelationshipStatusCode,
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

export interface IRelationshipStatusInfo {
  isBlocked: boolean | null;
  isRestricted: boolean | null;
  isMuted: boolean | null;
  isFollower: boolean | null;
  isFollowing: boolean | null;
  hasFollowRequest: boolean | null;
}

export interface CreateRelationshipModel {
  isBlocked?: boolean | null;
  isMuted?: boolean | null;
  isFollowing?: boolean | null;
}

export interface RequestRelationshipModel {
  hasFollowRequest: boolean | null;
}

export interface RemoveRelationshipModel {
  isBlocked?: boolean | null;
  isMuted?: boolean | null;
  isFollowing?: boolean | null;
  isFriend?: boolean | null;
  isFavorite?: boolean | null;
}

export interface CreateRelationshipInput {
  username?: string;
  id?: string;
  type: RelationshipStatusCode;
}

export interface RemoveRelationshipInput {
  username?: string;
  id?: string;
  type: RelationshipStatusCode;
}

export interface BaseRelationshipButtonProps {
  username: string;
}
