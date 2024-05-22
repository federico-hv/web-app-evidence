import { gql } from '@apollo/client';

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
// ----- //

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

export const GET_BLOCKED_ACCOUNTS = gql`
  query blockedUsers {
    blockedUsers {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export const GET_MUTED_ACCOUNTS = gql`
  query mutedUsers {
    mutedUsers {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export const GET_RELATIONSHIP_REQUESTS = gql`
  query relationshipRequests {
    relationshipRequests {
      id
      requestType
      requester {
        id
        username
        displayName
        avatar
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query followers($username: String!) {
    followers(username: $username) {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export const GET_RELATIONSHIP_COUNT = gql`
  query relationshipCount($username: String!) {
    followers(username: $username) {
      total
    }
    following(username: $username) {
      total
    }
  }
`;

export const GET_FOLLOWING = gql`
  query following($username: String!) {
    following(username: $username) {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export const GET_MUTUAL_USERS = gql`
  query mutualUsers($username: String!) {
    mutualUsers(username: $username) {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;

export const GET_RESTRICTED_ACCOUNTS = gql`
  query restrictedUsers {
    restrictedUsers {
      total
      users {
        id
        displayName
        username
        avatar
      }
    }
  }
`;
