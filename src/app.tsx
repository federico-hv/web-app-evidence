import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from './configs';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from './lib';
import { AlertDialogProvider, ToastProvider } from './shared';
import { AuthProvider } from './features';
import { Tooltip } from '@holdr-ui/react';
import Router from './router';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (import.meta.env.DEV) {
  // Print out error and dev messages for GraphQL in dev mode
  loadDevMessages();
  loadErrorMessages();
}

export function App() {
  globalStyles();
  return (
    <CookiesProvider>
      <ApolloProvider client={GQLClient}>
        <AuthProvider>
          <AlertDialogProvider>
            <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH}>
              <ToastProvider>
                <Tooltip.Provider>
                  <Router />
                </Tooltip.Provider>
              </ToastProvider>
            </BrowserRouter>
          </AlertDialogProvider>
        </AuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
