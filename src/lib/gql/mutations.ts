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
      status
      message
    }
  }
`;

export const DELETE_PHONE_NUMBER = gql`
  mutation deletePhoneNumber {
    deletePhoneNumber {
      status
      message
    }
  }
`;

export const DISABLE_TWO_FA = gql`
  mutation disableTwoFA($channel: TwoFAChannel!) {
    disableTwoFA(channel: $channel) {
      status
      message
    }
  }
`;
