import { gql } from '@apollo/client';

export const ADD_CONNECT_ACCOUNT = gql`
  mutation addConnectedAccount($payload: ConnectAccountInput!) {
    addConnectedAccount(payload: $payload) {
      status
      message
    }
  }
`;

export const REMOVE_CONNECTED_ACCOUNT = gql`
  mutation removeConnectedAccount($id: Int!) {
    removeConnectedAccount(id: $id) {
      id
      provider
      connectedOn
    }
  }
`;
