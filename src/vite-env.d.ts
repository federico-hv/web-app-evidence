/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_AUTH_APP_URL: string;
  readonly VITE_GQL_API_URL: string;
  readonly VITE_DOMAIN_URL: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_CLUBS_APP_URL: string;
  readonly VITE_SPOTIFY_REDIRECT_URI: string;
  readonly VITE_PENDO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
