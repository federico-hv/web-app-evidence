export interface SpotifyRequestMeResponse {
  country: string;
  id: string;
  product: 'premium' | 'free' | 'open'; // open can be considered as free
  type: 'user'; //account type: "user"
}

export interface SpotifyRequestTokenResponse {
  access_token: string;
  refresh_token: string;
  scopes: string;
  token_type: string;
  expires_in: string;
}
