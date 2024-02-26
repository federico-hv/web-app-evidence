import { ApolloClient, ApolloLink, GraphQLRequest } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { GQLCache } from './cache';
import { Cookies } from 'react-cookie';
import { errorLink } from './error-link';

// workaround links interface errors
const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GQL_API_URL,
});

const cookie = new Cookies();

// returns the token required for the requested operation
function getOperationToken(operation: GraphQLRequest) {
  return operation.operationName === 'refreshAccessToken'
    ? cookie.get('refresh_token') || ''
    : cookie.get('access_token') || '';
}

// Required to upload images/videos
const authLink = setContext((operation, { headers }) => {
  console.log('access token: ', cookie.get('access_token'));

  const token = getOperationToken(operation);
  // return the headers to the profile so httpLink can read them

  console.log({ token });
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const GQLClient = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    errorLink,
    uploadLink as unknown as ApolloLink,
  ]),
  cache: GQLCache,
});
