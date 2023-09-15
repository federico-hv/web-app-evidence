import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from './configs';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from './lib';
import { AlertDialogProvider, ToastProvider } from './shared';
import { AuthProvider } from './features';
import { Tooltip } from '@holdr-ui/react';
import Router from './router';

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
