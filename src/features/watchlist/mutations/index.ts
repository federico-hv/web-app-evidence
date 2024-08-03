import { gql } from '@apollo/client';

export const REMOVE_FROM_WATCHLIST = gql`
  mutation removeFromWatchlist($id: Int!) {
    removeFromWatchlist(id: $id) {
      id
      artist {
        id
        name
        avatar
        username
      }
      auction {
        id
        endsAt
        entryPrice
      }
      club {
        id
        url
        coverImage
      }
    }
  }
`;

export const ADD_TO_WATCHLIST = gql`
  mutation addToWatchlist($clubId: String!) {
    addToWatchList(clubId: $clubId) {
      id
      artist {
        id
        name
        avatar
        username
      }
      auction {
        id
        endsAt
        entryPrice
      }
      club {
        id
        url
        coverImage
      }
    }
  }
`;
