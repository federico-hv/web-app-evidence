import { gql } from '@apollo/client';

export const GET_ARTIST = gql`
  query artist($id: String, $slug: String) {
    artist(id: $id, slug: $slug) {
      id
      username
      collaborators {
        name
      }
      bio
      location
      avatar
      accountId
      name
      isVerified
      socialLinks {
        url
        provider
      }
    }
  }
`;

export const GET_ME_ARTIST = gql`
  query meArtist {
    meArtist {
      id
    }
  }
`;

export const GET_SPOTIFY_ARTISTS = gql`
  query spotifyArtists($queryString: String!, $limit: Int, $offset: Int) {
    spotifyArtists(
      queryString: $queryString
      limit: $limit
      offset: $offset
    ) {
      total
      next {
        limit
        offset
      }
      previous {
        limit
        offset
      }
      data {
        id
        name
        url
        images {
          height
          width
          url
        }
      }
    }
  }
`;

export const IS_ARTIST_PROFILE_COMPLETE = gql`
  query isArtistProfileComplete {
    isArtistProfileComplete
  }
`;

export const GET_ARTIST_GENRES = gql`
  query artistGenres($id: String!) {
    artistGenres(id: $id) {
      id
      label
    }
  }
`;

export const GET_SOCIAL_LINKS = gql`
  query socialLinks($id: String!) {
    socialLinks(id: $id) {
      provider
      url
    }
  }
`;
