import { gql } from '@apollo/client';

export const UPDATE_BIO_AND_PERKS = gql`
  mutation updateBioAndPerks(
    $payload: UpdateArtistDetailsInput!
    $perks: [Int!]!
  ) {
    updateArtistDetails(payload: $payload) {
      bio
    }
    addPerks(perks: $perks) {
      id
      label
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
