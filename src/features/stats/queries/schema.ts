import { gql } from '@apollo/client';

export const GET_CLUB_SUMMARY = gql`
  query ClubSummary {
    clubSummary {
      averagePrice
      lastSale
      membershipCount {
        sold
        remaining
      }
    }
  }
`;
