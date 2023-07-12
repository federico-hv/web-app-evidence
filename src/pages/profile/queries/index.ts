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

export const GET_RELATIONSHIP_COUNT = gql`
  query relationshipCount($username: String!) {
    relationshipCount(username: $username) {
      followers
      following
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query relationshipStatusInfo($username: String!) {
    relationshipStatusInfo(username: $username) {
      isOwned
    }
  }
`;
