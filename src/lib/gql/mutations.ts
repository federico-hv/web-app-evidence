import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation updateProfile($payload: UpdateProfileInput!) {
    updateProfile(payload: $payload) {
      displayName
      avatar
      coverImage
      bio
    }
  }
`;

export const UPDATE_ACCOUNT_INFO = gql`
  mutation updateAccountInfo($payload: UpdateAccountInfoInput!) {
    updateAccountInfo(payload: $payload) {
      username
      country
      gender
      birthday
      protected
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($payload: UpdatePasswordInput!) {
    updatePassword(payload: $payload) {
      status
      message
    }
  }
`;

export const SEND_VERIFICATION_OTP = gql`
  mutation sendVerificationOTP($payload: SendVerificationOtpInput!) {
    sendVerificationOTP(payload: $payload) {
      status
      message
    }
  }
`;

export const UPDATE_CONTACT_INFO = gql`
  mutation updateContactInfo($payload: UpdateContactInfoInput!) {
    updateContactInfo(payload: $payload) {
      email
      phone
    }
  }
`;
