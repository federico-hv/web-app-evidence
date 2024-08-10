import { gql } from '@apollo/client';

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($payload: UpdatePasswordInput!) {
    updatePassword(payload: $payload) {
      isSuccess
      status
      message
    }
  }
`;
