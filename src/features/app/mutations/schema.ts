import { gql } from '@apollo/client';

export const CREATE_OG_METADATA = gql`
  mutation ogMetadata($url: String!) {
    ogMetadata(url: $url) {
      images {
        url
        type
      }
      description
      title
      site {
        name
        logo
      }
      url
    }
  }
`;
