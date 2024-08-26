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
  query VisitsByCountry($period: TimePeriodEnum) {
    visitsByCountry(period: $period) {
      x
      y
    }
  }
`;

export const GET_SOCIAL_INTERACTIONS = gql`
  query SocialInteractions($year: Int) {
    monthlySocialInteractions(year: $year) {
      x
      y
    }
  }
`;

export const GET_MY_MEMBERS = gql`
  query MyMembers(
    $params: NumberPaginationParamsInput
    $sortBy: MembersSortByEnum
    $sortOrder: OrderByEnum
  ) {
    myMembers(params: $params, sortBy: $sortBy, sortOrder: $sortOrder) {
      total
      edges {
        cursor
        node {
          id
          user {
            id
            avatar
            displayName
            username
            role
          }
          membership {
            id
            number
            createdAt
          }
          payment {
            id
            createdAt
            amount
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
