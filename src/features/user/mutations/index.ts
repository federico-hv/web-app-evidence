import { gql } from '@apollo/client';

export const UPDATE_PROFILE_AVATAR = gql`
  mutation updateAvatar($payload: UpdateProfileInput!) {
    updateProfile(payload: $payload) {
      avatar
    }
  }
`;

export const ADD_EXTERNAL_ACCOUNT = gql`
  mutation addExternalAccount($payload: CreateExternalAccountInput!) {
    addExternalAccount(payload: $payload) {
      id
      externalId
      provider
      url
    }
  }
`;

export const REMOVE_EXTERNAL_ACCOUNT = gql`
  mutation removeExternalAccount($id: Int!) {
    removeExternalAccount(id: $id) {
      id
      externalId
      provider
      url
    }
  }
`;
