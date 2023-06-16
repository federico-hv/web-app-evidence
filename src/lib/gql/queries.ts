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

export const GET_RELATIONSHIP_WITH_USER = gql`
  query relationshipWithUser($username: String!) {
    relationshipWithUser(username: $username)
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
      followers
      following
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
