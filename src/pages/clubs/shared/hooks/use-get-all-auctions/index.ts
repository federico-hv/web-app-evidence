import { useQuery } from '@apollo/client';
import { GET_ALL_AUCTIONS } from '../../../../../features/auction/queries';

export function useGetAllAuctions() {
  return useQuery<any, any>(GET_ALL_AUCTIONS);
}
