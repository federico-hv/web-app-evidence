import {
  IProfile,
  ProfileFormData,
  RelationshipStatusInfo,
} from './interfaces';

export function parseToProfileFormData(
  profile: IProfile,
): ProfileFormData {
  return {
    displayName: profile.displayName,
    bio: profile.bio || '',
    avatar: undefined,
    coverImage: undefined,
  };
}

/**
 * parses the relationship status information
 * to get current relationship between users.
 * @param accountRelationship an object containing the relationship status information
 */
export function getRelationshipButton(
  accountRelationship: RelationshipStatusInfo,
): 'block' | 'follow_request' | 'following' | 'follow' {
  if (accountRelationship.isBlocked) {
    return 'block';
  } else if (accountRelationship.hasFollowRequest) {
    return 'follow_request';
  } else if (accountRelationship.isFollowing) {
    return 'following';
  } else {
    return 'follow';
  }
}
