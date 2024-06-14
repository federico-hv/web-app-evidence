import { useLazyQuery, useQuery, useSuspenseQuery } from '@apollo/client';
import { IS_ARTIST_PROFILE_COMPLETE } from '../../queries';

export function useIsArtistProfileComplete() {
  return useQuery<{ isArtistProfileComplete: boolean }>(
    IS_ARTIST_PROFILE_COMPLETE,
  );
}

export function useSuspenseIsArtistProfileComplete() {
  return useSuspenseQuery<{ isArtistProfileComplete: boolean }>(
    IS_ARTIST_PROFILE_COMPLETE,
  );
}

export function useLazyIsArtistProfileComplete() {
  const [getIsArtistProfileComplete, { loading, error, data, refetch }] =
    useLazyQuery<{
      requiresProfileUpdate: boolean;
    }>(IS_ARTIST_PROFILE_COMPLETE, { fetchPolicy: 'network-only' });

  return { getIsArtistProfileComplete, loading, error, data, refetch };
}
