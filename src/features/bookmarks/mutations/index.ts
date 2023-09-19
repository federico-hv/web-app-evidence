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
