import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_PERKS } from '../../queries';
import { IPerk } from '../types';

/**
 *
 * @param clubId
 */
export function useGetClubPerks(clubId: string) {
  return useQuery<{ clubPerks: IPerk[] }, { id: string }>(GET_CLUB_PERKS, {
    variables: { id: clubId },
  });
}

/**
 *
 * @param clubId
 */
export function useSuspenseGetClubPerks(clubId: string) {
  return useSuspenseQuery<{ clubPerks: IPerk[] }, { id: string }>(
    GET_CLUB_PERKS,
    {
      variables: { id: clubId },
    },
  );
}
