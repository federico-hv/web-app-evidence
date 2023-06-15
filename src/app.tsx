import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from 'configs';
import { AuthProvider } from 'contexts';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from 'lib';
import Router from './router';
import { Toast } from '@holdr-ui/react';

export function App() {
  globalStyles();
  return (
    <CookiesProvider>
      <ApolloProvider client={GQLClient}>
        <AuthProvider>
          <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH}>
            <Toast.Provider>
              <Router />
            </Toast.Provider>
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
