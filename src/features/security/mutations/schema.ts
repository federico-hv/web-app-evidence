import { gql } from '@apollo/client';

export const SEND_VERIFICATION_CODE = gql`
  mutation sendVerificationCode(
    $recipient: String!
    $channel: ContactChannel!
  ) {
    sendVerificationCode(recipient: $recipient, channel: $channel) {
      status
      message
    }
  }
`;

export const CHECK_VERIFICATION_CODE = gql`
  mutation checkVerificationCode($payload: CheckVerificationCodeInput!) {
    checkVerificationCode(payload: $payload) {
      isSuccess
      status
      message
    }
  }
`;
