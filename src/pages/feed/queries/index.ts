import { gql } from '@apollo/client';

export const GET_BOOKMARKED_USERS = gql`
  query usersWhoBookmarked(
    $id: String!
    $params: StringPaginationParamsInput
  ) {
    usersWhoBookmarked(id: $id, params: $params) {
      edges {
        node {
          id
          username
          avatar
          displayName
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
