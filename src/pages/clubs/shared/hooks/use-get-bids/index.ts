import { useQuery } from '@apollo/client';
import { GET_BIDS } from '../../../../../features';

interface Club {
  id: string;
  coverImage: string;
  url: string;
}

interface Artist {
  id: string;
  displayName: string;
  username: string;
}

interface Owner {
  id: string;
  username: string;
}

interface Bid {
  id: number;
  amount: number;
  createdAt: number;
}

interface Auction {
  endsAt: number;
}

interface Node {
  club: Club;
  artist: Artist;
  owner: Owner;
  bid: Bid;
  auction: Auction;
}

export interface BidsEdge {
  node: Node;
  cursor: number;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: number;
  endCursor: number;
}

export interface Bids {
  edges: BidsEdge[];
  pageInfo: PageInfo;
}

export interface BidsData {
  bids: Bids;
}

export function useGetBids(filter: string = 'active') {
  return useQuery<BidsData, { filter: string }>(GET_BIDS, {
    variables: {
      filter,
    },
    pollInterval: 1000,
  });
}
