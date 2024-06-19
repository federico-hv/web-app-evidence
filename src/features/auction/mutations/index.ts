import { gql } from '@apollo/client';

export const CREATE_LIVE_AUCTION = gql`
  mutation createAuction($payload: CreateAuctionInput!) {
    createAuction(payload: $payload) {
      id
      endsAt
      entryPrice
    }
  }
`;
