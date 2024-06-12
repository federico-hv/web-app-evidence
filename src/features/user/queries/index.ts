import { gql } from '@apollo/client';

export const GET_USER_GENRES = gql`
  query userGenres {
    userGenres {
      id
      label
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
      displayName
      username
      avatar
      bio
      protected
      location
      following
      followers
      favoriteSong {
        id
        name
        coverImage
        artists
        externalIds {
          id
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
          id
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
