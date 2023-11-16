import { gql } from '@apollo/client';

export const GET_CONNECTED_ACCOUNTS = gql`
  query connectedAccounts(
    $name: ProviderName
    $params: NumberPaginationParamsInput
  ) {
    connectedAccounts(params: $params, name: $name) {
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
