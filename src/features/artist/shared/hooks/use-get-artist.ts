import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ARTIST } from '../../queries';
import { IArtist } from '../types';

interface QueryArtistArgs {
  id?: string;
  slug?: string;
}

/**
 * Get an artist's account
 *
 */
export function useSuspenseGetArtist(params: QueryArtistArgs) {
  return useSuspenseQuery<{ artist: IArtist }, QueryArtistArgs>(
    GET_ARTIST,
    {
      variables: params,
    },
  );
}

/**
 * Get an artist's account (Suspense)
 *
 */
export function useGetArtist(params: QueryArtistArgs) {
  return useQuery<{ artist: IArtist }, QueryArtistArgs>(GET_ARTIST, {
    variables: params,
  });
}
