import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from './v1/configs';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from '@apollo/client';
import { GQLClient } from './v2/lib';
import { Router } from './v2/routes';
import { AlertDialogProvider, ToastProvider } from './v2/shared';
import { AuthProvider } from './v2/features';
//import Router from './v1/router';

export function App() {
  globalStyles();
  return (
    <CookiesProvider>
      <ApolloProvider client={GQLClient}>
        <AuthProvider>
          <AlertDialogProvider>
            <BrowserRouter basename={import.meta.env.VITE_APP_BASE_PATH}>
              <ToastProvider>
                <Router />
              </ToastProvider>
            </BrowserRouter>
          </AlertDialogProvider>
        </AuthProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
