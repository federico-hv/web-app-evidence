import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ARTIST_GENRES } from '../../queries';
import { IGenre } from '../../../app';

export function useSuspenseArtistGenres(id: string) {
  return useSuspenseQuery<{ artistGenres: IGenre[] }, { id: string }>(
    GET_ARTIST_GENRES,
    { variables: { id } },
  );
}

export function useArtistGenres(id: string) {
  return useQuery<{ artistGenres: IGenre[] }, { id: string }>(
    GET_ARTIST_GENRES,
    { variables: { id } },
  );
}
