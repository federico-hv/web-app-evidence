import { ApolloClient, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { GQLCache } from './cache';
import { Cookies } from 'react-cookie';

// workaround link type errors
const uploadLink = createUploadLink({
  uri: import.meta.env.VITE_GQL_API_URL,
});

const cookie = new Cookies();

const authLink = setContext((_, { headers }) => {
  const token = cookie.get('access_token');
  // return the headers to the context so httpLink can read them
  console.log('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const GQLClient = new ApolloClient({
  link: authLink.concat(uploadLink as unknown as ApolloLink),
  cache: GQLCache,
});
