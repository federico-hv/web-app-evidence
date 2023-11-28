import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetchSpotifyUser } from '../utility';

/**
 * Get the user details from Spotify:
 * `tokens`: The access and refresh tokens
 * `id`: the user's id.
 */
export function useSpotifyUser() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  return useSWR(code, fetchSpotifyUser);
}
