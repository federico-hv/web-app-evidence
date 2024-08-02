import { gql } from '@apollo/client';

export const GET_AUCTION = gql`
  query getAuction($clubId: String!) {
    auction(clubId: $clubId) {
      id
      startsAt
      endsAt
      entryPrice
      artist {
        name
        username
      }
      numberOfMemberships
    }
  }
`;

export const GET_BID = gql`
  query bid($auctionId: Int!) {
    bid(auctionId: $auctionId) {
      club {
        id
        coverImage
        url
      }
      artist {
        id
        displayName
        username
      }
      owner {
        id
        username
      }
      bid {
        id
        amount
        createdAt
      }
    }
  }
`;

export const GET_REMAINING_MEMBERSHIP_COUNT = gql`
  query remainingMembershipsCount($auctionId: Int!) {
    remainingMembershipsCount(auctionId: $auctionId)
  }
`;

export const GET_CONTENDERS = gql`
  query getContenders(
    $id: Int!
    $filter: ContenderFilterEnum!
    $params: NumberPaginationParamsInput
  ) {
    contenders(id: $id, filter: $filter, params: $params) {
      edges {
        node {
          club {
            id
            coverImage
            url
          }
          artist {
            id
            displayName
            username
          }
          owner {
            id
            displayName
            username
            role
          }
          bid {
            id
            amount
            createdAt
          }
        }
      }
    }
  }
`;
