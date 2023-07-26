import { gql } from '@apollo/client';

export const GET_USER_FEEDS = gql`
  query userFeeds($payload: UserFeedsInput!) {
    userFeeds(payload: $payload) {
      count
      data {
        id
        type
        createdAt
        owner {
          id
          displayName
          username
          avatar
        }
        node {
          ... on PollModel {
            description
            responses {
              id
              text
            }
          }
          ... on PostModel {
            description
          }
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
  }
`;

export const GET_FEEDS = gql`
  query feeds($type: String!) {
    feeds(type: $type) {
      count
      data {
        id
        type
        createdAt
        owner {
          id
          displayName
          username
          avatar
        }
        node {
          ... on PollModel {
            description
            responses {
              id
              text
            }
          }
          ... on PostModel {
            description
          }
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
  }
`;
