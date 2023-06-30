import {
  relationshipStatusCode,
  createRelationshipActions,
  removeRelationshipActions,
} from 'shared';

export type RelationshipStatusCode =
  (typeof relationshipStatusCode)[number];

export type CreateRelationshipAction =
  (typeof createRelationshipActions)[number];

export type RemoveRelationshipAction =
  (typeof removeRelationshipActions)[number];
