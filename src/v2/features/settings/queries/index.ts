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
