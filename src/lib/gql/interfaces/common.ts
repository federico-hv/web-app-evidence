import {
  CreateRelationshipAction,
  RelationshipStatusCode,
  RemoveRelationshipAction,
} from '../types';

export interface RelationshipModel {
  addresseeId: string;
  code: RelationshipStatusCode;
}

export interface CreateRelationshipInput {
  username: string;
  action: CreateRelationshipAction;
}

export interface RemoveRelationshipInput {
  username: string;
  action: RemoveRelationshipAction;
}
