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

export const GET_BLOCKED_USERS = gql`
  query blockedUsers($params: NumberPaginationParamsInput) {
    blockedUsers(params: $params) {
      total
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
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

export const GET_MUTED_USERS = gql`
  query mutedUsers($params: NumberPaginationParamsInput) {
    mutedUsers(params: $params) {
      total
      edges {
        cursor
        node {
          id
          avatar
          role
          username
          displayName
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
