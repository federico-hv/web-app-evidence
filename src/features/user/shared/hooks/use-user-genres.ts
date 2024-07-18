import { useQuery, useSuspenseQuery } from '@apollo/client';
import { IGenre } from '../../../app';
import { GET_USER_GENRES } from '../../queries/schema';

export function useUserGenres() {
  return useQuery<{ userGenres: IGenre[] }>(GET_USER_GENRES);
}

export function useSuspenseUserGenres() {
  return useSuspenseQuery<{ userGenres: IGenre[] }>(GET_USER_GENRES);
}
