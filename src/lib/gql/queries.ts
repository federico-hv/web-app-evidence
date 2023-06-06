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
      biography
      accountType
      username
      displayName
      connected
      coverImage
      avatar
    }
  }
`;

export const FIND_USER = gql`
  query searchForUser($q: String!) {
    searchForUser(queryString: $q) {
      username
      displayName
      id
      avatar
      role
    }
  }
`;
