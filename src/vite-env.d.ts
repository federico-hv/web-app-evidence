
/// <reference type="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_AUTH_APP_URL: string;
  readonly VITE_GQL_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
