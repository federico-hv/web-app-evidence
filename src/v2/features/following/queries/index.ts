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

export const GET_ME = gql`
  query me {
    me {
      id
      username
      displayName
      role
      avatar
    }
  }
`;

export const GET_PROFILE = gql`
  query profile($username: String!) {
    profile(username: $username) {
      username
      displayName
      coverImage
      avatar
      bio
      protected
    }
  }
`;
