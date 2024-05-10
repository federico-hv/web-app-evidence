import { gql } from '@apollo/client';

export const GET_CLUB = gql`
  query club($id: String, $artistId: String, $accountId: String) {
    club(id: $id, artistId: $artistId, accountId: $accountId) {
      id
      bannerImage
      coverImage
      url
      # perks
      artist {
        id
        bio
        name
        avatar
        isVerified
      }
    }
  }
`;

export const GET_CLUB_PERKS = gql`
  query clubPerks($id: String!) {
    clubPerks(id: $id) {
      id
      label
    }
  }
`;

export const GET_PRESET_PERKS = gql`
  query presetPerks {
    presetPerks {
      id
      label
      description
    }
  }
`;

export const IS_UNIQUE_CLUB_URL = gql`
  query isUniqueClubURL($url: String!, $notClub: String) {
    isUniqueClubURL(url: $url, notClub: $notClub)
  }
`;
