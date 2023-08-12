import { gql } from '@apollo/client';

export const SAVE_SEARCH_HISTORY = gql`
  mutation saveSearchHistory($id: String!, $entity: String!) {
    saveSearchHistory(id: $id, entity: $entity) {
      id
      avatar
      username
      displayName
    }
  }
`;

export const REMOVE_SEARCH_HISTORY_ITEM = gql`
  mutation removeSearchHistoryItem($id: String!) {
    removeSearchHistoryItem(id: $id) {
      id
      avatar
      username
      displayName
    }
  }
`;

export const REMOVE_ALL_SEARCH_HISTORY_ITEMS = gql`
  mutation removeAllSearchHistoryItems {
    removeAllSearchHistoryItems {
      status
      message
    }
  }
`;
