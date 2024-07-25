import { useQuery } from '@apollo/client';
import { GET_AUCTION } from '../../../../features/auction/queries';

export interface Artist {
  name: string;
  username: string;
}

export interface IAuction {
  id: number;
  startsAt: Date;
  endsAt: Date;
  entryPrice: number;
  artist: Artist;
  numberOfMemberships: number;
}

export interface AuctionData {
  auction: IAuction;
}
//{ auction: IAuction }, { clubId: string }
export function useGetAuction(clubId: string) {
  //Upddate typescript types
  return useQuery<AuctionData, any>(GET_AUCTION, {
    variables: { clubId },
    pollInterval: 1,
  });
}
