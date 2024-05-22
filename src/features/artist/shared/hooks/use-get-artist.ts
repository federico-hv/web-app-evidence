import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ARTIST } from '../../queries';
import { SuspenseQueryHookFetchPolicy } from '@apollo/client/react/types/types';
import { IArtist } from '../types';

/**
 * Get an artist's account
 *
 * Suspense version
 *
 * @param fetchPolicy see @{SuspenseQueryHookFetchPolicy}
 */
export function useSuspenseGetArtist(
  fetchPolicy?: SuspenseQueryHookFetchPolicy,
) {
  return useSuspenseQuery<{ artist: IArtist }>(GET_ARTIST, {
    fetchPolicy,
  });
}

/**
 * Get an artist's account
 *
 * @param fetchPolicy see @{SuspenseQueryHookFetchPolicy}
 */
export function useGetArtist(fetchPolicy?: SuspenseQueryHookFetchPolicy) {
  return useQuery<{ artist: IArtist }>(GET_ARTIST, {
    fetchPolicy,
  });
}
