import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_BID_STATUS } from '../../queries';
import { AuctionBidStatusEnum } from '../enums';

export function useBidStatusQuery(bidId: number) {
  return useQuery<{ bidStatus: AuctionBidStatusEnum }, { bidId: number }>(
    GET_BID_STATUS,
    { variables: { bidId } },
  );
}

export function useBidStatusSuspenseQuery(bidId: number) {
  return useSuspenseQuery<
    { bidStatus: AuctionBidStatusEnum },
    { bidId: number }
  >(GET_BID_STATUS, { variables: { bidId } });
}
