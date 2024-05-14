import { gql } from '@apollo/client';

export const CREATE_CUSTOM_ACCOUNT_SESSION = gql`
  mutation createCustomAccountSession {
    createCustomAccountSession {
      account
      client_secret
      expires_at
      livemode
    }
  }
`;

export const CREATE_CUSTOM_ACCOUNT_LINK = gql`
  mutation createCustomAccountLink(
    $refreshURL: String!
    $returnURL: String!
  ) {
    createCustomAccountLink(
      refreshURL: $refreshURL
      returnURL: $returnURL
    ) {
      created
      expires_at
      url
    }
  }
`;
