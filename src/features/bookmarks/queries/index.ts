import { gql } from '@apollo/client';

export const GET_BOOKMARK_GROUPS = gql`
  query bookmarkGroups(
    $feedId: String
    $params: StringPaginationParamsInput
  ) {
    bookmarkGroups(feedId: $feedId, params: $params) {
      edges {
        node {
          id
          name
          total
          saved
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

export const GET_BOOKMARKS = gql`
  query bookmarks($id: String!, $params: NumberPaginationParamsInput) {
    bookmarks(id: $id, params: $params) {
      edges {
        node {
          id
          feed {
            id
            type
            isPinned
            reaction
            createdAt
            owner {
              id
              displayName
              username
              avatar
            }
            node {
              ... on PostModel {
                id
                endDate
                description
                media {
                  id
                  url
                  type
                }
                polls {
                  id
                  text
                  count
                  voted
                }
              }
              ... on ArticleModel {
                id
                title
                description
                imageUrl
                source {
                  name
                  logo
                }
              }
            }
          }
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
