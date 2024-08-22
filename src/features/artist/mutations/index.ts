import { gql } from '@apollo/client';

export const UPDATE_BIO_AND_PERKS = gql`
  mutation updateBioAndPerks(
    $payload: UpdateArtistProfileInput!
    $perks: [Int!]!
  ) {
    updateArtistProfile(payload: $payload) {
      bio
    }
    updatePerks(perks: $perks) {
      id
      label
      description
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

export const UPDATE_ANNOUNCEMENT = gql`
  mutation updateAnnouncements($announcements: [String!]!) {
    updateAnnouncements(announcements: $announcements) {
      id
      description
      createdAt
    }
  }
`;

export const UPDATE_EXTERNAL_LINKS = gql`
  mutation updateArtistLinks($links: [ExternalLinkInput!]!) {
    updateArtistLinks(links: $links) {
      id
      type
      url
      label
    }
  }
`;

export const SAVE_ARTIST_PICKS = gql`
  mutation saveArtistPicks($releases: [SaveFavoriteSongInput!]!) {
    saveArtistPicks(releases: $releases) {
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

export const SAVE_ARTIST_DETAILS = gql`
  mutation saveArtistAdditionalDetails(
    $announcements: [String!]!
    $releases: [SaveFavoriteSongInput!]!
    $links: [ExternalLinkInput!]!
  ) {
    updateAnnouncements(announcements: $announcements) {
      id
      description
      createdAt
    }
    saveArtistPicks(releases: $releases) {
      id
      name
      coverImage
      externalIds {
        externalId
        provider
      }
    }
    updateArtistLinks(links: $links) {
      id
      type
      url
      label
    }
  }
`;

export const UPDATE_ARTIST_PROFILE = gql`
  mutation updateArtistProfile($payload: UpdateArtistProfileInput!) {
    updateArtistProfile(payload: $payload) {
      id
      bio
      username
      collaborators {
        name
      }
      accountId
      location
      avatar
      name
      isVerified
      socialLinks {
        url
        provider
      }
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
