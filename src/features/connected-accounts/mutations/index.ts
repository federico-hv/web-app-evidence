import { gql } from '@apollo/client';

export const CONNECT_ACCOUNT = gql`
  mutation connectAccount($payload: ConnectAccountInput!) {
    connectAccount(payload: $payload) {
      status
      message
    }
  }
`;
