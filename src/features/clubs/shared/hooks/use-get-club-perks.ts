import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CLUB_PERKS } from '../../queries';
import { IPerk } from '../types';

export function useGetClubPerks(id: string) {
  return useQuery<{ clubPerks: IPerk[] }, { id: string }>(GET_CLUB_PERKS, {
    variables: { id },
  });
}

export function useSuspenseGetClubPerks(id: string) {
  return useSuspenseQuery<{ clubPerks: IPerk[] }, { id: string }>(
    GET_CLUB_PERKS,
    {
      variables: { id },
    },
  );
}
