import {
  createRelationshipActions,
  relationshipStatusCode,
  removeRelationshipActions,
  requestRelationshipActions,
} from '../constants';

export type RelationshipStatusCode =
  (typeof relationshipStatusCode)[number];

export type CreateRelationshipAction =
  (typeof createRelationshipActions)[number];

export type RemoveRelationshipAction =
  (typeof removeRelationshipActions)[number];

export type RequestRelationshipAction =
  (typeof requestRelationshipActions)[number];
