import { gql } from '@apollo/client';

export const GET_ACCOUNT_INFO = gql`
  query accountInfo {
    accountInfo {
      email
      username
      phone
      country
      gender
      birthday
      protected
    }
  }
`;

export const GET_TWO_FA_CHANNEL = gql`
  query twoFAChannel {
    twoFAChannel
  }
`;

export const GET_2FA_RECOVERY_KEY = gql`
  query twoFARecoveryKey {
    twoFARecoveryKey
  }
`;
