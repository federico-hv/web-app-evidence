import { useQuery } from '@apollo/client';
import { GET_WATCHLIST } from '../../../../../features/watchlist/queries';
import { IPerk } from 'features';

interface Artist {
  id: string;
  name: string;
  avatar: string;
  username: string;
}

interface Auction {
  id: string;
  endsAt: Date;
  entryPrice: number;
}

interface Club {
  id: string;
  url: string;
  coverImage: string;
  perks: IPerk[];
}

interface Node {
  id: number;
  artist: Artist;
  auction: Auction | null;
  club: Club;
}

export interface WatchlistEdge {
  cursor: string;
  node: Node;
}

export interface WatchlistData {
  watchlist: {
    edges: WatchlistEdge[];
  };
}

export function useGetWatchlist(accountId: string) {
  return useQuery<WatchlistData, { accountId: string }>(GET_WATCHLIST, {
    fetchPolicy: 'no-cache',
    variables: {
      accountId,
    },
    pollInterval: 1000,
  });
}
