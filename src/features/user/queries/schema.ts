import { gql } from '@apollo/client';

export const GET_USER_GENRES = gql`
  query userGenres {
    userGenres {
      id
      label
    }
  }
`;

export const GET_ACCOUNT_INFO = gql`
  query accountInfo {
    accountInfo {
      id
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

export const GET_EXTERNAL_ACCOUNT = gql`
  query externalAccount($provider: String!) {
    externalAccount(provider: $provider) {
      id
      externalId
      provider
      url
      username
      avatar
    }
  }
`;

export const GET_PROFILE = gql`
  query profile($username: String!) {
    profile(username: $username) {
      username
      displayName
      avatar
      bio
      protected
      location
      favoriteSong {
        id
        name
        coverImage
        artists
        externalIds {
          provider
          externalId
        }
      }
      favoriteArtists {
        id
        name
        image
        artistId
        externalIds {
          provider
          externalId
          externalUrl
        }
      }
      socialLinks {
        provider
        url
      }
    }
  }
`;

export const CHECK_IS_PROFILE_BLOCKED_OR_PROTECTED = gql`
  query checkIsProfileBlockedOrProtected($username: String!) {
    checkIsProfileBlockedOrProtected(username: $username)
  }
`;

export const CHECK_IS_UNIQUE_FIELD = gql`
  query isUniqueField($field: UniqueIdentityField!, $value: String!) {
    isUniqueField(field: $field, value: $value)
  }
`;
