import {
  generateCodeChallenge,
  generateRandomString,
} from '../../../../shared';
import {
  SpotifyRequestMeResponse,
  SpotifyRequestTokenResponse,
} from '../types';

export class SpotifyUtility {
  /**
   * Request a code challenge from Spotify.
   */
  static async requestCode() {
    const codeVerifier = generateRandomString(60);
    const scope = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
    ].join(' ');

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      // const state = generateRandomString(16);

      const authUrl = new URL('https://accounts.spotify.com/authorize');

      sessionStorage.setItem('code_verifier', codeVerifier);

      const args = new URLSearchParams({
        response_type: 'code',
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      });

      authUrl.search = args.toString();

      window.location.href = authUrl.toString();
    });
  }

  /**
   * Use the provided code to request an access token.
   * @param code the code challenge
   */
  static async requestTokens(code: string) {
    const codeVerifier = sessionStorage.getItem('code_verifier');

    if (!codeVerifier) {
      throw new Error('Failed to find code verifier.');
    }

    return fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  static async requestMe(accessToken: string) {
    return fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }
}

/**
 * This function fetches a spotify user and the tokens associated with it.
 *
 * @param code the code from Spotify in the redirect url.
 */
export const fetchSpotifyUser = async (code: string) => {
  return SpotifyUtility.requestTokens(code)
    .then((data: SpotifyRequestTokenResponse) => {
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    })
    .then((tokens) =>
      SpotifyUtility.requestMe(tokens.accessToken).then(
        (me: SpotifyRequestMeResponse) => ({ me, tokens }),
      ),
    )
    .then((data) => data);
};
