import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_PERKS } from '../../queries';
import { IPerk } from '../types';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';

interface IGetClubPerkResponse {
  clubId: string;
  perks: IPerk[];
}

/**
 *
 * @param clubId
 */
export function useGetClubPerks(clubId: string) {
  return useQuery<{ clubPerks: IGetClubPerkResponse }, { id: string }>(
    GET_CLUB_PERKS,
    {
      variables: { id: clubId },
    },
  );
}

/**
 *
 * @param clubId
 * @param fetchPolicy
 */
export function useSuspenseGetClubPerks(
  clubId: string,
  fetchPolicy?: SuspenseQueryHookFetchPolicy,
) {
  return useSuspenseQuery<
    { clubPerks: IGetClubPerkResponse },
    { id: string }
  >(GET_CLUB_PERKS, {
    variables: { id: clubId },
    fetchPolicy,
  });
}
