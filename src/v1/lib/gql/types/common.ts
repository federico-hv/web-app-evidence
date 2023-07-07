import {
  relationshipStatusCode,
  createRelationshipActions,
  removeRelationshipActions,
  requestRelationshipActions,
} from '../../../shared';

export type RelationshipStatusCode =
  (typeof relationshipStatusCode)[number];

export type CreateRelationshipAction =
  (typeof createRelationshipActions)[number];

export type RemoveRelationshipAction =
  (typeof removeRelationshipActions)[number];

export type RequestRelationshipAction =
  (typeof requestRelationshipActions)[number];
