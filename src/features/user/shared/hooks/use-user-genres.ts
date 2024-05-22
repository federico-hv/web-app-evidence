import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IGenre } from '../../../app';
import { GET_USER_GENRES } from '../../queries';

export function useUserGenres() {
  return useQuery<{ userGenres: IGenre[] }>(GET_USER_GENRES);
}

export function useSuspenseUserGenres() {
  return useSuspenseQuery<{ userGenres: IGenre[] }>(GET_USER_GENRES);
}
