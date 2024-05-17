import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_PRESET_GENRES } from '../../queries';
import { IGenre } from '../types';

export function usePresetGenres() {
  return useQuery<{ presetGenres: IGenre[] }>(GET_PRESET_GENRES);
}
export function useSuspensePresetGenres() {
  return useSuspenseQuery<{ presetGenres: IGenre[] }>(GET_PRESET_GENRES);
}
