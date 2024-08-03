import { useQuery } from '@apollo/client';
import { GET_ALL_AUCTIONS } from '../../../../../features/auction/queries';

interface Artist {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface Club {
  id: string;
  coverImage: string;
  url: string;
  perks: {
    id: number;
    label: string;
    description: string;
  }[];
}

interface AuctionNode {
  id: number;
  startsAt: number;
  endsAt: number;
  entryPrice: number;
  numberOfMemberships: number;
  artist: Artist;
  club: Club;
}

export interface AuctionEdge {
  node: AuctionNode;
}

export interface AuctionsData {
  auctions: {
    edges: AuctionEdge[];
  };
}

export function useGetAllAuctions() {
  return useQuery<AuctionsData>(GET_ALL_AUCTIONS, {
    pollInterval: 1000,
  });
}
