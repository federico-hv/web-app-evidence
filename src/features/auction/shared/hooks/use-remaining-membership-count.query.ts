import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_REMAINING_MEMBERSHIP_COUNT } from '../../queries';

export function useRemainingMembershipCountQuery(auctionId: number) {
  return useQuery<
    { remainingMembershipsCount: number },
    { auctionId: number }
  >(GET_REMAINING_MEMBERSHIP_COUNT, { variables: { auctionId } });
}

export function useRemainingMembershipCountSuspenseQuery(
  auctionId: number,
) {
  return useSuspenseQuery<
    { remainingMembershipsCount: number },
    { auctionId: number }
  >(GET_REMAINING_MEMBERSHIP_COUNT, { variables: { auctionId } });
}
