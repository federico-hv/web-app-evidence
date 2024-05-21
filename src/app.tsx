import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from './configs';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from './lib';
import {
  AlertDialogProvider,
  GenericProps,
  GQLRenderer,
  ToastProvider,
} from './shared';
import {
  ArtistProvider,
  AuthProvider,
  CompleteArtistSetupBanner,
} from './features';
import { Box, Portal, Tooltip, VStack } from '@holdr-ui/react';
import Router from './router';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { HelmetProvider } from 'react-helmet-async';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom/client';

if (import.meta.env.DEV) {
  // Print out error and dev messages for GraphQL in dev mode
  loadDevMessages();
  loadErrorMessages();
}

export function App() {
  globalStyles();

  return (
    <CookiesProvider>
      <HelmetProvider>
        <ApolloProvider client={GQLClient}>
          <AuthProvider>
            <ArtistProvider>
              <AlertDialogProvider>
                <BrowserRouter
                  basename={import.meta.env.VITE_APP_BASE_PATH}
                >
                  <ToastProvider>
                    <Tooltip.Provider>
                      <Router />
                    </Tooltip.Provider>
                  </ToastProvider>
                </BrowserRouter>
              </AlertDialogProvider>
            </ArtistProvider>
          </AuthProvider>
        </ApolloProvider>
      </HelmetProvider>
    </CookiesProvider>
  );
}
