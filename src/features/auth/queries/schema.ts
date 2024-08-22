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

export const REFRESH_ACCESS_TOKEN = gql`
  query refreshAccessToken {
    refreshAccessToken {
      accessToken
      refreshToken
      expiresAt
    }
  }
`;

export const GET_TWO_FA_CHANNEL = gql`
  query twoFAChannel {
    twoFAChannel
  }
`;

export const GET_TWO_FA_RECOVERY_KEY = gql`
  query twoFARecoveryKey {
    twoFARecoveryKey
  }
`;
