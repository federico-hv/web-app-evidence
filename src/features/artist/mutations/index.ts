import { gql } from '@apollo/client';

export const UPDATE_BIO_AND_PERKS = gql`
  mutation updateBioAndPerks(
    $payload: UpdateProfileInput!
    $perks: [Int!]!
  ) {
    updateProfile(payload: $payload) {
      bio
    }
    updatePerks(perks: $perks) {
      id
      label
    }
  }
`;

export const UPDATE_ARTIST_GENRES = gql`
  mutation updateArtistGenres($genres: [Int!]!) {
    updateArtistGenres(genres: $genres) {
      id
      label
    }
  }
`;

export const UPDATE_ARTIST_DETAILS = gql`
  mutation updateArtistDetails($payload: UpdateArtistDetailsInput!) {
    updateArtistDetails(payload: $payload) {
      name
    }
  }
`;

export const UPDATE_SOCIAL_LINKS = gql`
  mutation updateSocialLinks($links: [SocialLinkInput!]!) {
    updateSocialLink(links: $links) {
      provider
      url
    }
  }
`;
