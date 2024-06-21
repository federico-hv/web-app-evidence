import { gql } from '@apollo/client';

export const UPDATE_CLUB = gql`
  mutation updateClub($payload: UpdateClubInput!) {
    updateClub(payload: $payload) {
      id
      bannerImage
      coverImage
      url
      artist {
        id
        name
        avatar
        isVerified
      }
    }
  }
`;

export const UPDATE_PERKS = gql`
  mutation updatePerks($perks: [Int!]!) {
    updatePerks(perks: $perks) {
      id
      label
      description
    }
  }
`;
