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

export const CREATE_POST = gql`
  mutation createPost($payload: CreatePostInput!) {
    createPost(payload: $payload) {
      id
      type
      node {
        __typename
        ... on PostModel {
          id
          description
        }
        ... on PollModel {
          id
          description
          responses {
            id
            text
          }
        }
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle($payload: CreateArticleInput!) {
    createArticle(payload: $payload) {
      id
      type
      node {
        __typename
        ... on ArticleModel {
          id
          title
          description
          imageUrl
          url
          source {
            name
            logo
            url
          }
        }
      }
    }
  }
`;
