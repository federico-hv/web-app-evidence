import { gql } from '@apollo/client';

export const GET_CLUB_OVERVIEW = gql`
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

export const GET_CLUB_ANALYTICS = gql`
  query ClubAnalytics {
    clubSummary {
      averagePrice {
        value
        percentage
      }
      milestones {
        numerator
        denominator
      }
      lastSale {
        value
        percentage
      }
      membershipCount {
        numerator
        denominator
      }
      averageBidders {
        value
        percentage
      }
      clubViews {
        value
        percentage
      }
    }
    socialSummary {
      peakEngagementTime
    }
  }
`;

export const GET_QUICK_ANALYTICS = gql`
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

export const GET_MONTHLY_MEMBERSHIP_VALUES = gql`
  query MonthlyMembershipValues {
    monthlyMembershipValues {
      x
      y
    }
  }
`;

export const GET_VISITS_BY_COUNTRY = gql`
  query VisitsByCountry {
    visitsByCountry {
      x
      y
    }
  }
`;
