import { gql } from '@apollo/client';

export const GET_CONNECTED_ACCOUNTS = gql`
  query connectedAccounts($params: NumberPaginationParamsInput) {
    connectedAccounts(params: $params) {
      edges {
        node {
          provider
          connectedOn
        }
        cursor
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
