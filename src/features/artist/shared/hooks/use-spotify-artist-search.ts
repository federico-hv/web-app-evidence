import { debounce, DebouncedFunc } from 'lodash';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { GET_SPOTIFY_ARTISTS } from '../../queries';

/**
 * Use Spotify search.
 *
 * TODO: Make this generic
 */
export function useSpotifyArtistSearch<T>(): [
  DebouncedFunc<(newValue: string) => Promise<void>>,
  {
    result: T | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [result, setResult] = useState<T>();
  const [query, { loading, error }] = useLazyQuery<
    {
      spotifyArtist: T;
    },
    { queryString: string; limit?: number; offset?: number }
  >(GET_SPOTIFY_ARTISTS);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (newValue: string) => {
      const { data } = await query({
        variables: { queryString: newValue, limit: 5, offset: 0 },
      });

      if (data) setResult(data.spotifyArtist);
    }, 500),
    [],
  );

  return [search, { result, error, loading }];
}
