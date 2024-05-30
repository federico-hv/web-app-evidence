import { gql } from '@apollo/client';

export const SEARCH = gql`
  query search($queryString: String!) {
    search(queryString: $queryString) {
      count
      data {
        username
        displayName
        id
        avatar
      }
    }
  }
`;

export const GET_SEARCH_HISTORY = gql`
  query searchHistory {
    searchHistory {
      count
      data {
        id
        avatar
        username
        displayName
        role
      }
    }
  }
`;
