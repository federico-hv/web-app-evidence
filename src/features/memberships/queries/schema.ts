import { gql } from '@apollo/client';

export const GET_MY_MEMBERSHIPS = gql`
  query MyMemberships($params: StringPaginationParamsInput) {
    myMemberships(params: $params) {
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
          }
          perks {
            description
            label
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
