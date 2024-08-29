export const relationshipStatusCode = ['B', 'F', 'M', 'P', 'S'] as const;

export const createRelationshipActions = [
  'block',
  'follow',
  'mute',
  'favorite',
  'restrict',
] as const;

export const removeRelationshipActions = [
  'block',
  'follow',
  'mute',
  'friend',
  'favorite',
  'restrict',
  'follow request',
  'friend request',
] as const;

export const requestRelationshipActions = [
  'follow request',
  'friend request',
] as const;

export enum RelationshipStatusCodeEnum {
  Following = 'F',
  Blocked = 'B',
  Muted = 'M',
  Restricted = 'S',
  Requested = 'P',
}
