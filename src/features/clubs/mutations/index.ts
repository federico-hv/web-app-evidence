import { gql } from '@apollo/client';

export const UPDATE_CLUB = gql`
  mutation updateClub($payload: UpdateClubInput!) {
    updateClub(payload: $payload) {
      id
      bannerImage
      coverImage
      url
      # perks
      artist {
        id
        name
        avatar
        isVerified
      }
    }
  }
`;
