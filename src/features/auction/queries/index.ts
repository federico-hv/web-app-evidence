import { gql } from '@apollo/client';

export const GET_AUCTION = gql`
  query getAuction($clubId: String!) {
    auction(clubId: $clubId) {
      id
      startsAt
      endsAt
      entryPrice
      artist {
        name
        username
      }
      numberOfMemberships
    }
  }
`;

export const GET_CONTENDERS = gql`
  query getContenders(
    $id: Int!
    $filter: ContenderFilterEnum!
    $params: NumberPaginationParamsInput
  ) {
    contenders(id: $id, filter: $filter, params: $params) {
      edges {
        node {
          user {
            id
            displayName
            username
            role
          }
          bid {
            id
            amount
            createdAt
          }
        }
      }
    }
  }
`;
