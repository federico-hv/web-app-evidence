import {
  createRelationshipActions,
  relationshipStatusCode,
  removeRelationshipActions,
  requestRelationshipActions,
} from '../constants';
import { IProfile } from '../interfaces';
import { IFetchUsersResponse } from '../../../../shared';

export type RelationshipStatusCode =
  (typeof relationshipStatusCode)[number];

export type CreateRelationshipAction =
  (typeof createRelationshipActions)[number];

export type RemoveRelationshipAction =
  (typeof removeRelationshipActions)[number];

export type RequestRelationshipAction =
  (typeof requestRelationshipActions)[number];

export type UpdateProfileData = { updateProfile: IProfile };

export type QueryType = 'following' | 'followers' | 'mutualUsers';

export type Followers = {
  followers: IFetchUsersResponse;
  following?: never;
  mutualUsers?: never;
};

export type Following = {
  following: IFetchUsersResponse;
  followers?: never;
  mutualUsers?: never;
};

export type Mutual = {
  mutualUsers: IFetchUsersResponse;
  followers?: never;
  following?: never;
};
