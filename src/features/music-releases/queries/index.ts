import { gql } from '@apollo/client';

export const SEARCH_FOR_SPOTIFY_ARTIST = gql`
  query spotifyArtist($queryString: String!, $limit: Int, $offset: Int) {
    spotifyArtist(
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

export const SEARCH_FOR_SPOTIFY_TRACK = gql`
  query spotifyTrack($queryString: String!, $limit: Int, $offset: Int) {
    spotifyTrack(
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
        artists
        images {
          height
          width
          url
        }
      }
    }
  }
`;
