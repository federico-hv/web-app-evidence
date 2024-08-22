import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IAuctionBid } from '../types';
import { GET_BID } from '../../queries';

export function useBidQuery(auctionId: number) {
  return useQuery<{ bid: IAuctionBid }, { auctionId: number }>(GET_BID, {
    variables: { auctionId },
  });
}

export function useBidSuspenseQuery(auctionId: number) {
  return useSuspenseQuery<{ bid: IAuctionBid }, { auctionId: number }>(
    GET_BID,
    {
      variables: { auctionId },
    },
  );
}
