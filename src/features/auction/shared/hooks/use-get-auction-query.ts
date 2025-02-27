import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_AUCTION } from '../../queries';
import { IAuction } from '../types';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';

//{ auction: IAuction }, { clubId: string }
export function useGetAuctionQuery(clubId: string) {
  //Update typescript types
  return useQuery<{ auction: IAuction }, { clubId: string }>(GET_AUCTION, {
    variables: { clubId },
  });
}

export function useGetAuctionSuspenseQuery(
  clubId: string,
  options?: { fetchPolicy?: SuspenseQueryHookFetchPolicy },
) {
  //Update typescript types
  return useSuspenseQuery<{ auction: IAuction }, { clubId: string }>(
    GET_AUCTION,
    {
      variables: { clubId },
      ...options,
    },
  );
}
