import { gql } from '@apollo/client';

export const REMOVE_BOOKMARK_GROUP = gql`
  mutation removeBookmarkGroup($id: String!) {
    removeBookmarkGroup(id: $id) {
      id
      name
      total
      private
    }
  }
`;

export const RENAME_BOOKMARK_GROUP = gql`
  mutation renameBookmarkGroup($id: String!, $name: String!) {
    renameBookmarkGroup(id: $id, name: $name) {
      id
      name
      total
      private
    }
  }
`;

export const CREATE_BOOKMARK_GROUP = gql`
  mutation createBookmarkGroup($name: String!, $isPrivate: Boolean) {
    createBookmarkGroup(name: $name, isPrivate: $isPrivate) {
      id
      name
      total
      private
    }
  }
`;

export const CHANGE_BOOKMARK_GROUP_VISIBILITY = gql`
  mutation changeBookmarkGroupVisibility(
    $id: String!
    $isPrivate: Boolean!
  ) {
    changeBookmarkGroupVisibility(id: $id, isPrivate: $isPrivate) {
      id
      name
      total
      private
    }
  }
`;

export const REMOVE_BOOKMARK = gql`
  mutation removeBookmark($feedId: String!, $bookmarkGroupId: String) {
    removeBookmark(feedId: $feedId, bookmarkGroupId: $bookmarkGroupId) {
      status
      message
    }
  }
`;

export const CREATE_BOOKMARK = gql`
  mutation createBookmark($feedId: String!, $bookmarkGroupId: String) {
    createBookmark(feedId: $feedId, bookmarkGroupId: $bookmarkGroupId) {
      bookmarkGroup {
        id
        total
        name
        private
        saved
      }
      bookmark {
        id
        feed {
          id
          type
          isBookmarked
          isLiked
          isPinned
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
    }
  }
`;
