import { gql } from '@apollo/client';

export const GET_RELATIONSHIP_STATUS_INFO = gql`
  query relationshipStatusInfo($username: String!) {
    relationshipStatusInfo(username: $username) {
      isBlocked
      isMuted
      isFollower
      isFollowing
      isRestricted
      hasFollowRequest
    }
  }
`;

export const GET_BLOCKED_ACCOUNTS = gql`
  query blockedAccounts($username: String!) {
    blockedAccounts(username: $username) {
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
          relationshipStatusInfo {
            isFollower
            isFollowing
            isRestricted
            hasFollowRequest
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_MUTED_ACCOUNTS = gql`
  query mutedUsers($username: String!) {
    mutedUsers(username: $username) {
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
          relationshipStatusInfo {
            isFollower
            isFollowing
            isRestricted
            hasFollowRequest
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_RELATIONSHIP_REQUESTS = gql`
  query relationshipRequests {
    relationshipRequests {
      edges {
        cursor
        node {
          id
          requester {
            id
            role
            username
            displayName
            avatar
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query followers($username: String!) {
    followers(username: $username) {
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
          relationshipStatusInfo {
            isFollower
            isFollowing
            isRestricted
            hasFollowRequest
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_RELATIONSHIP_COUNT = gql`
  query relationshipCount($username: String!) {
    relationshipCount(username: $username) {
      followers
      following
    }
  }
`;

export const GET_FOLLOWING = gql`
  query following($username: String!) {
    following(username: $username) {
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
          relationshipStatusInfo {
            isFollower
            isFollowing
            isRestricted
            hasFollowRequest
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
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

export const GET_RESTRICTED_USERS = gql`
  query restrictedUsers($username: String!) {
    restrictedUsers(username: $username) {
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
          relationshipStatusInfo {
            isFollower
            isFollowing
            isRestricted
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
