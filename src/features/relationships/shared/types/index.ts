import {
  createRelationshipActions,
  relationshipStatusCode,
  removeRelationshipActions,
  requestRelationshipActions,
} from '../constants';
import {
  IConnection,
  IFetchUsersResponse,
  UserModel,
} from '../../../../shared';
import { IRelationshipStatusInfo } from '../interfaces';

export type RelationshipStatusCode =
  (typeof relationshipStatusCode)[number];

export type CreateRelationshipAction =
  (typeof createRelationshipActions)[number];

export type RemoveRelationshipAction =
  (typeof removeRelationshipActions)[number];

export type RequestRelationshipAction =
  (typeof requestRelationshipActions)[number];

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

export type UserWithRelationship = UserModel & {
  relationshipStatusInfo: IRelationshipStatusInfo;
};

export type ManyUsersWithRelationship = IConnection<
  UserWithRelationship,
  string
>;

export type AltManyUsersWithRelationship = IConnection<
  UserWithRelationship,
  number
>;
