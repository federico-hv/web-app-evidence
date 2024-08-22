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

export const UPDATE_USER_GENRES = gql`
  mutation updateUserGenres($genres: [Int!]!) {
    updateUserGenres(genres: $genres) {
      id
      label
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

export const UPDATE_PROFILE = gql`
  mutation updateProfile($payload: UpdateProfileInput!) {
    updateProfile(payload: $payload) {
      username
      displayName
      avatar
      bio
      location
    }
  }
`;

export const UPDATE_PROFILE_AND_LINKS = gql`
  mutation updateProfileAndLinks(
    $profile: UpdateProfileInput!
    $links: [SocialLinkInput!]!
  ) {
    updateProfile(payload: $profile) {
      username
      displayName
      avatar
      bio
      location
    }
    updateSocialLink(links: $links) {
      provider
      url
    }
  }
`;

export const SAVE_FAVORITE_SONG = gql`
  mutation saveFavoriteSong($payload: SaveFavoriteSongInput!) {
    saveFavoriteSong(payload: $payload) {
      id
      artists
      name
      coverImage
      externalIds {
        provider
        externalId
      }
    }
  }
`;

export const REMOVE_FAVORITE_SONG = gql`
  mutation removeFavoriteSong {
    removeFavoriteSong {
      id
      name
      coverImage
      externalIds {
        externalId
        provider
      }
    }
  }
`;

export const SAVE_FAVORITE_ARTIST = gql`
  mutation saveFavoriteArtist($payload: SaveFavoriteArtistInput!) {
    saveFavoriteArtist(payload: $payload) {
      id
      name
      image
      artistId
      externalIds {
        externalId
        provider
        externalUrl
      }
    }
  }
`;

export const REMOVE_FAVOURITE_ARTIST = gql`
  mutation removeFavoriteArtist($id: Int!) {
    removeFavoriteArtist(id: $id) {
      id
      name
      image
      externalIds {
        externalId
        provider
      }
    }
  }
`;

export const UPDATE_CONTACT_INFORMATION = gql`
  mutation updateContactInfo(
    $contact: String!
    $channel: ContactTypeEnum!
    $code: String!
  ) {
    updateContactInfo(contact: $contact, channel: $channel, code: $code) {
      data {
        email
        phone
      }
      status
      isSuccess
      message
    }
  }
`;
