import { gql } from '@apollo/client';

export const CHECK_HAS_PAYMENT_METHOD = gql`
  query hasPaymentMethod {
    hasPaymentMethod
  }
`;
