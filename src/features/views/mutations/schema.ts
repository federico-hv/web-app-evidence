import { gql } from '@apollo/client';

export const SAVE_CLUB_VIEWS = gql`
  mutation saveClubViews($clubIds: [String!]!) {
    saveClubViews(clubIds: $clubIds) {
      status
      message
      isSuccess
    }
  }
`;

export const SAVE_FEED_VIEWS = gql`
  mutation saveFeedViews($feedIds: [String!]!) {
    saveFeedViews(feedIds: $feedIds) {
      status
      message
      isSuccess
    }
  }
`;

export const SAVE_PROFILE_VIEWS = gql`
  mutation saveProfileView($username: String!) {
    saveProfileView(username: $username) {
      status
      message
      isSuccess
    }
  }
`;

export const SAVE_AUCTION_VIEWS = gql`
  mutation saveAuctionViews($auctionIds: [Int!]!) {
    saveAuctionViews(auctionIds: $auctionIds) {
      status
      message
      isSuccess
    }
  }
`;
