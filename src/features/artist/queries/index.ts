import { gql } from '@apollo/client';

export const GET_ARTIST = gql`
  query artist {
    artist {
      id
      avatar
      name
      isVerified
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

export const GET_SOCIAL_LINKS = gql`
  query socialLinks {
    socialLinks {
      provider
      url
    }
  }
`;
