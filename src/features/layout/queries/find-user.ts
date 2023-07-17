import { gql } from '@apollo/client';

export const FIND_USER = gql`
  query findUser($queryString: String!) {
    findUser(queryString: $queryString) {
      username
      displayName
      id
      avatar
    }
  }
`;
