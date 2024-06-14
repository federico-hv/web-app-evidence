import { debounce, DebouncedFunc } from 'lodash';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import {
  SEARCH_FOR_SPOTIFY_ARTIST,
  SEARCH_FOR_SPOTIFY_TRACK,
} from '../../queries';
import { ISpotifyArtistResponse, ISpotifyTrackResponse } from '../types';
import { IOffsetPage } from '../../../../shared';

/**
 * Search for a spotify artist or track - returns top 5 search results.
 *
 * @param type the type of search query: 'track' or 'artist'
 */
export function useSearchForSpotifyItem<T>(type: 'track' | 'artist'): [
  DebouncedFunc<(newValue: string) => Promise<void>>,
  {
    result:
      | IOffsetPage<ISpotifyTrackResponse | ISpotifyArtistResponse>
      | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const QueryDocument = {
    track: SEARCH_FOR_SPOTIFY_TRACK,
    artist: SEARCH_FOR_SPOTIFY_ARTIST,
  };
  const [result, setResult] =
    useState<
      IOffsetPage<ISpotifyTrackResponse | ISpotifyArtistResponse>
    >();
  const [query, { loading, error }] = useLazyQuery<
    | { spotifyTrack: any; spotifyArtist?: never }
    | { spotifyArtist: any; spotifyTrack?: never },
    {
      queryString: string;
      limit?: number;
      offset?: number;
    }
  >(QueryDocument[type]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (newValue: string) => {
      const { data } = await query({
        variables: { queryString: newValue, limit: 5, offset: 0 },
      });

      if (data && type === 'track') setResult(data.spotifyTrack);
      else if (data && type === 'artist') setResult(data.spotifyArtist);
    }, 500),
    [],
  );

  return [search, { result, error, loading }];
}
