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
          media {
            id
            url
            type
          }
          polls {
            id
            text
            count
            voted
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

export const VOTE_POLL = gql`
  mutation votePoll($id: Int!, $pollId: Int!) {
    votePoll(id: $id, pollId: $pollId) {
      id
      description
      media {
        id
        url
        type
      }
      polls {
        id
        text
        count
        voted
      }
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation removeReaction($id: String!, $reaction: FeedReaction!) {
    removeReaction(id: $id, reaction: $reaction) {
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
        __typename
        ... on PostModel {
          id
          description
          media {
            id
            url
            type
          }
          polls {
            id
            text
            count
            voted
          }
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
`;

export const ADD_REACTION = gql`
  mutation addReaction($id: String!, $reaction: FeedReaction!) {
    addReaction(id: $id, reaction: $reaction) {
      id
      type
      createdAt
      reaction {
        name
        count
      }
      owner {
        id
        displayName
        username
        avatar
      }
      node {
        __typename
        ... on PostModel {
          id
          description
          endDate
          media {
            id
            url
            type
          }
          polls {
            id
            text
            count
            voted
          }
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
`;
