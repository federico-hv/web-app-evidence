import { gql } from '@apollo/client';

export const GET_CONNECT_ACCOUNT_STATUS = gql`
  query connectAccountStatus {
    connectAccountStatus
  }
`;
