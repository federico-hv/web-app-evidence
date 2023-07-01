export const relationshipStatusCode = [
  'B',
  'C',
  'F',
  'M',
  'O',
  'P',
  'R',
] as const;

export const createRelationshipActions = [
  'block',
  'follow',
  'mute',
  'favourite',
] as const;

export const removeRelationshipActions = [
  'block',
  'follow',
  'mute',
  'friend',
  'favourite',
  'follow request',
  'friend request',
] as const;

export const requestRelationshipActions = [
  'follow request',
  'friend request',
] as const;
