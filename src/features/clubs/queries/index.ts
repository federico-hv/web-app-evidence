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
        location
        bio
        username
        accountId
        avatar
        isVerified
      }
    }
  }
`;

export const GET_ARTIST_DETAILS = gql`
  query artistDetails($id: String!) {
    externalArtistLinks(id: $id) {
      id
      label
      type
      url
    }
    artistPicks(id: $id) {
      id
      name
      coverImage
      externalIds {
        externalId
        provider
      }
    }
    announcements(id: $id) {
      id
      description
      createdAt
    }
  }
`;

export const GET_ARTIST_COLLABORATORS = gql`
  query collaborator($id: String!) {
    collaborators(id: $id) {
      id
      name
      accountId
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
