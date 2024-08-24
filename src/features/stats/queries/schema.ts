import { gql } from '@apollo/client';

export const GET_CLUB_SUMMARY = gql`
  query ClubOverview {
    clubOverview: clubSummary {
      averagePrice {
        value
        percentage
      }
      lastSale {
        value
        percentage
      }
      membershipCount {
        numerator
        denominator
      }
    }
  }
`;

export const GET_QUICK_ANALYTOCS = gql`
  query QuickAnalytics {
    clubAnalytics: clubSummary {
      clubViews {
        value
        percentage
      }
      averageBidders {
        value
        percentage
      }
    }
    socialAnalytics: socialSummary {
      peakEngagementTime
      socialInteractions {
        value
        percentage
      }
    }
  }
`;
