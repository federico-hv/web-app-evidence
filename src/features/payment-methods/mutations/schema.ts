import { gql } from '@apollo/client';

export const CREATE_SETUP_INTENT = gql`
  mutation createSetupIntent {
    createSetupIntent
  }
`;

export const LINK_PAYMENT_METHOD = gql`
  mutation linkPaymentMethod($paymentMethodId: String!) {
    linkPaymentMethod(paymentMethodId: $paymentMethodId) {
      isSuccess
      message
      status
    }
  }
`;
