import { gql } from '@apollo/client';

export const GET_RELATIONSHIP_STATUS_INFO = gql`
  query relationshipStatusInfo($username: String!) {
    relationshipStatusInfo(username: $username) {
      isBlocked
      isMuted
      isFollower
      isFollowing
      isFriend
      isFavourite
      isRestricted
      hasFriendRequest
      hasFollowRequest
      isOwned
    }
  }
`;
