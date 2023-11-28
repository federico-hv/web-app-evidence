import { gql } from '@apollo/client';

export const GET_CONNECTED_ACCOUNTS = gql`
  query connectedAccounts(
    $names: [ProviderName!]
    $params: NumberPaginationParamsInput
  ) {
    connectedAccounts(params: $params, names: $names) {
      edges {
        node {
          id
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
