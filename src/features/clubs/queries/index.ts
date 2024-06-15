import { gql } from '@apollo/client';

export const GET_CLUB = gql`
  query club($params: ClubSearchParamsInput!) {
    club(params: $params) {
      id
      bannerImage
      coverImage
      url
      artist {
        id
        name
        bio
        username
        accountId
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
      description
    }
  }
`;

export const IS_UNIQUE_CLUB_URL = gql`
  query isUniqueClubURL($url: String!, $notClub: String) {
    isUniqueClubURL(url: $url, notClub: $notClub)
  }
`;
