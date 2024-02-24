import { onError } from '@apollo/client/link/error';
import { REFRESH_ACCESS_TOKEN } from '../../features/auth/queries';
import * as querystring from 'querystring';
import { Cookies } from 'react-cookie';
import { Operation, fromPromise } from '@apollo/client';
import {
  GQLClient,
  isAuthError,
  useRemoveCookie,
  useSetCookie,
} from '../../shared';

let pendingRequests: VoidFunction[] = [];
let isRefreshingToken: boolean;
const setRefreshingToken = (state: boolean) => (isRefreshingToken = state);

const cookie = new Cookies();
/* eslint-disable react-hooks/rules-of-hooks */
// these aren't really hooks.
const removeCookie = useRemoveCookie();
const setCookie = useSetCookie();

// requests for a new access token using the refresh token, and sets it
// as a cookie
const refreshAccessToken = async () => {
  return GQLClient.mutate({
    mutation: REFRESH_ACCESS_TOKEN,
  })
    .then((res) => {
      removeCookie('access_token');
      const data = res.data.refreshAccessToken;

      // remove if no access token returned is impossible
      // should we redirect here?
      if (!data.accessToken) {
        onRefreshError();
      }
      setCookie('access_token', data.accessToken, data.expiresAt);
    })
    .catch(() => onRefreshError());
};

const onRefreshError = () => {
  removeCookie('refresh_token');

  // might want to change this
  const fromPath = new URLSearchParams(window.location.search).get('from');
  const queryParams = querystring.encode({
    redirect_url: `${import.meta.env.VITE_APP_BASE_URL}${fromPath}`,
  });

  window.open(
    `${import.meta.env.VITE_AUTH_APP_URL}?${queryParams}`,
    '_self',
  );
};

// adds the new access token to the header of the given operation
const addNewToken = (operation: Operation) => {
  operation.setContext({
    headers: {
      ...operation.getContext().headers,
      Authorization: `Bearer ${cookie.get('access_token')}`,
    },
  });
};

// resolve all pending requests
const resolvePendingRequests = () => {
  pendingRequests.map((resolve) => resolve());
  pendingRequests = [];
};

export const errorLink = onError(
  ({ graphQLErrors, operation, forward }) => {
    if (
      isAuthError(graphQLErrors) &&
      operation.operationName != 'refreshAccessToken'
    ) {
      if (!isRefreshingToken) {
        setRefreshingToken(true);
        // refresh the access token
        return fromPromise(refreshAccessToken()).flatMap(() => {
          // token is successfully refreshed
          setRefreshingToken(false);
          resolvePendingRequests();

          // deal with our current request
          addNewToken(operation);
          return forward(operation);
        });
      } else {
        return fromPromise(
          new Promise((resolve) =>
            pendingRequests.push(() => resolve(null)),
          ),
          // once the above promise resolves, we will
          // forward the operation
        ).flatMap(() => {
          addNewToken(operation);
          return forward(operation);
        });
      }
    }
  },
);
