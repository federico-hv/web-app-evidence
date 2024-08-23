import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from './configs';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from './lib';
import {
  AlertDialogProvider,
  RouteChangeListener,
  ToastProvider,
} from './shared';
import { ArtistProvider, AuthProvider } from './features';
import { Tooltip } from '@holdr-ui/react';
import Router from './router';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { HelmetProvider } from 'react-helmet-async';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './configs/stripe';

if (import.meta.env.DEV) {
  // Print out error and dev messages for GraphQL in dev mode
  loadDevMessages();
  loadErrorMessages();
}

export function App() {
  globalStyles();

  return (
    <Elements stripe={stripePromise}>
      <CookiesProvider>
        <HelmetProvider>
          <ApolloProvider client={GQLClient}>
            <AuthProvider>
              <ArtistProvider>
                <AlertDialogProvider>
                  <ToastProvider>
                    <Tooltip.Provider>
                      <BrowserRouter
                        basename={import.meta.env.VITE_APP_BASE_PATH}
                      >
                        <RouteChangeListener>
                          <Router />
                        </RouteChangeListener>
                      </BrowserRouter>
                    </Tooltip.Provider>
                  </ToastProvider>
                </AlertDialogProvider>
              </ArtistProvider>
            </AuthProvider>
          </ApolloProvider>
        </HelmetProvider>
      </CookiesProvider>
    </Elements>
  );
}
