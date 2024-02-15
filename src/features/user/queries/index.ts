import { gql } from '@apollo/client';

export const GET_PROFILE_SUMMARY = gql`
  query GET_PROFILE_SUMMARY($username: String!) {
    followers(username: $username) {
      total
    }
    following(username: $username) {
      total
    }
  }
`;
