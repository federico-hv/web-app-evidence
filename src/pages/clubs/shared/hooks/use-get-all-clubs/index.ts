import { useQuery } from '@apollo/client';
import { GET_ALL_CLUBS } from '../../../../../features/clubs/queries';

export function useGetAllClubs() {
  return useQuery<any, any>(GET_ALL_CLUBS);
}
