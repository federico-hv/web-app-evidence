import { gql } from '@apollo/client';

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
