import { gql } from '@apollo/client';

export const GET_PROFILE_SUMMARY = gql`
  query followers($username: String!) {
    followers(username: $username) {
      total
    }
    following(username: $username) {
      total
    }
  }
`;

export const GET_EXTERNAL_ACCOUNT = gql`
  query externalAccount($provider: String!) {
    externalAccount(provider: $provider) {
      id
      externalId
      provider
      url
      username
      avatar
    }
  }
`;
