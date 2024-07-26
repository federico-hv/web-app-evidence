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

export const DELETE_LIVE_AUCTION = gql`
  mutation deleteAuction($id: Int!) {
    deleteAuction(id: $id) {
      id
      endsAt
      entryPrice
    }
  }
`;

export const CREATE_BID = gql`
  mutation createBid($id: Int!, $amount: Float!) {
    createBid(id: $id, amount: $amount) {
      bid {
        id
        createdAt
        amount
      }
      user {
        id
        username
        displayName
      }
    }
  }
`;

export const UPDATE_BID = gql`
  mutation updateBid($id: Int!, $amount: Float!) {
    updateBid(id: $id, amount: $amount) {
      bid {
        id
        createdAt
        amount
      }
      user {
        id
        username
        displayName
      }
    }
  }
`;

export const DELETE_BID = gql`
  mutation deleteBid($id: Int!) {
    deleteBid(id: $id) {
      bid {
        id
        createdAt
        amount
      }
      user {
        id
        username
        displayName
      }
    }
  }
`;
