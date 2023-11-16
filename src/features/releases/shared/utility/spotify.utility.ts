import {
  generateCodeChallenge,
  generateRandomString,
} from '../../../../shared';

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
      const state = generateRandomString(16);

      sessionStorage.setItem('code_verifier', codeVerifier);

      const args = new URLSearchParams({
        response_type: 'code',
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      });

      window.open(
        'https://accounts.spotify.com/authorize?' + args,
        '_self',
      );
      //
      // window.location.href =
      //   'https://accounts.spotify.com/authorize?' + args;
    });
  }

  /**
   * Use the provided code challenge to request an access token.
   * @param code the code challenge
   */
  static async requestTokens(code: string) {
    const codeVerifier = sessionStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier || '',
    });

    return fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
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

  static async requestMe() {
    const access_token = localStorage.getItem('spotify_access_token');

    return fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
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
