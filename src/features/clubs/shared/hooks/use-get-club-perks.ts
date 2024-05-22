import { useQuery } from '@apollo/client';
import { GET_CLUB_PERKS } from '../../queries';
import { IPerk } from '../interfaces';

/**
 *
 * @param id
 */
export function useGetClubPerks(id: string) {
  return useQuery<{ clubPerks: IPerk[] }, { id: string }>(GET_CLUB_PERKS, {
    variables: { id },
  });
}
