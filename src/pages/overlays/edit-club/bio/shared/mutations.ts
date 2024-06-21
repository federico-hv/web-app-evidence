import { gql } from '@apollo/client';

export const UPDATE_ARTIST_BIO_AND_LINKS = gql`
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
    updateClub(payload: $payload) {
      updateClub(payload: $payload) {
        url
      }
    }
    updateSocialLink(links: $links) {
      provider
      url
    }
  }
`;
