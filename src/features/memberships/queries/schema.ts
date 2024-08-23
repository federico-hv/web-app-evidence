import { gql } from '@apollo/client';

export const GET_USER_MEMBERSHIPS = gql`
  query UserMemberships(
    $username: String!
    $params: StringPaginationParamsInput
  ) {
    userMemberships(username: $username, params: $params) {
      total
      edges {
        cursor
        node {
          id
          number
          club {
            id
            name
            url
            coverImage
            perks {
              description
              label
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_CLUB_MEMBERS = gql`
  query ClubMembers(
    $clubId: String!
    $params: StringPaginationParamsInput
  ) {
    clubMembers(clubId: $clubId, params: $params) {
      total
      edges {
        cursor
        node {
          id
          avatar
          displayName
          username
          role
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const OWNS_CLUB_MEMBERSHIP = gql`
  query OwnsClubMembership($clubId: String!) {
    ownsClubMembership(clubId: $clubId)
  }
`;
