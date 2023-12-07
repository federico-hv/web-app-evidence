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
