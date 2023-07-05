import { gql } from '@apollo/client';

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

export const FIND_USER = gql`
  query findUser($queryString: String!) {
    findUser(queryString: $queryString) {
      username
      displayName
      id
      avatar
    }
  }
`;

export const GET_ACCOUNT_INFO = gql`
  query accountInfo {
    accountInfo {
      email
      username
      phone
      country
      gender
      birthday
      protected
    }
  }
`;

export const GET_CONNECTED_ACCOUNTS = gql`
  query connectedAccounts {
    connectedAccounts {
      provider
      email
    }
  }
`;

export const GET_TWO_FA_CHANNEL = gql`
  query twoFAChannel {
    twoFAChannel
  }
`;

export const GET_2FA_RECOVERY_KEY = gql`
  query twoFARecoveryKey {
    twoFARecoveryKey
  }
`;

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

export const GET_BLOCKED_ACCOUNTS = gql`
  query blockedUsers {
    blockedUsers {
      id
      username
      displayName
      avatar
    }
  }
`;

export const GET_MUTED_ACCOUNTS = gql`
  query mutedUsers {
    mutedUsers {
      id
      username
      displayName
      avatar
    }
  }
`;

export const GET_RESTRICTED_ACCOUNTS = gql`
  query restrictedUsers {
    restrictedUsers {
      id
      username
      displayName
      avatar
    }
  }
`;
