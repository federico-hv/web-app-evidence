import { gql } from '@apollo/client';

export const GET_WATCHLIST = gql`
  query watchlist($accountId: String!) {
    watchlist(accountId: $accountId) {
      edges {
        cursor
        node {
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
            perks {
              id
              label
              description
            }
          }
        }
      }
    }
  }
`;
