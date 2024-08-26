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

export const GET_BID_STATUS = gql`
  query bidStatus($bidId: Int!) {
    bidStatus(bidId: $bidId)
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

export const GET_ALL_AUCTIONS = gql`
  query auctions(
    $sortBy: AuctionSortByEnum
    $sortOrder: OrderByEnum
    $params: NumberPaginationParamsInput
  ) {
    auctions(sortBy: $sortBy, sortOrder: $sortOrder, params: $params) {
      edges {
        cursor
        node {
          id
          startsAt
          endsAt
          entryPrice
          numberOfMemberships
          artist {
            id
            name
            username
          }
          club {
            id
            url
            isWatchlisted
            coverImage
            perks {
              label
              description
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_BIDS = gql`
  query bids(
    $sortBy: AuctionBidSortByEnum
    $sortOrder: OrderByEnum
    $filter: AuctionBidFilterEnum
    $params: NumberPaginationParamsInput
  ) {
    bids(
      sortBy: $sortBy
      sortOrder: $sortOrder
      params: $params
      filter: $filter
    ) {
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
            username
          }
          bid {
            id
            amount
            createdAt
          }
          auction {
            endsAt
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
