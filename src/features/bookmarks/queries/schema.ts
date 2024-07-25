import { gql } from '@apollo/client';

export const GET_ALL_BOOKMARKS_TOTAL = gql`
  query allBookmarkTotal {
    allBookmarkTotal
  }
`;

export const GET_BOOKMARK_GROUPS = gql`
  query bookmarkGroups($feedId: String) {
    bookmarkGroups(feedId: $feedId) {
      edges {
        node {
          id
          name
          total
          private
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

export const GET_BOOKMARK_GROUP = gql`
  query bookmarkGroup($id: String!) {
    bookmarkGroup(id: $id) {
      id
      name
      total
      private
    }
  }
`;

export const GET_BOOKMARKS = gql`
  # Write your query or mutation here
  query bookmarks($id: String, $params: NumberPaginationParamsInput) {
    bookmarks(id: $id, params: $params) {
      edges {
        node {
          id
          feed {
            id
            type
            isPinned
            isBookmarked
            isLiked
            createdAt
            owner {
              id
              displayName
              username
              avatar
            }
            item {
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
