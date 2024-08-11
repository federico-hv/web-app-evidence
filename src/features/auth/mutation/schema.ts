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

export const TWO_FA_APP_REGISTRATION = gql`
  mutation twoFAAppRegistration {
    twoFAAppRegistration {
      code
      qrCodeUrl
    }
  }
`;

export const ENABLE_TWO_FA = gql`
  mutation enableTwoFA($payload: EnableTwoFaInput!) {
    enableTwoFA(payload: $payload) {
      isSuccess
      status
      message
    }
  }
`;

export const DISABLE_TWO_FA = gql`
  mutation disableTwoFA($channel: TwoFAChannel!) {
    disableTwoFA(channel: $channel) {
      isSuccess
      status
      message
    }
  }
`;

export const REFRESH_TWO_FA_RECOVERY_CODE = gql`
  mutation refreshTwoFARecoveryKey {
    refreshTwoFARecoveryKey
  }
`;
