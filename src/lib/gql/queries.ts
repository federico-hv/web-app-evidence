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
  query profile($payload: ProfileInput!) {
    profile(payload: $payload) {
      accountType
      username
      displayName
      connected
      coverImage
      avatar
    }
  }
`;
