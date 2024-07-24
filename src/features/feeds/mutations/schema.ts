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
      isPinned
      reaction
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
      isPinned
      reaction
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

export const PIN_FEED = gql`
  mutation pinFeed($id: String!) {
    pinFeed(id: $id) # feed ID [nullable, string]
  }
`;

export const UNPIN_FEED = gql`
  mutation unpinFeed($id: String!) {
    unpinFeed(id: $id) # feed ID [nullable, string]
  }
`;

export const DELETE_FEED = gql`
  mutation deleteFeed($id: String!) {
    deleteFeed(id: $id) # feed id, [nullable, string]
  }
`;

export const CHANGE_AUDIENCE = gql`
  mutation changeFeedAudience($id: String!, $audience: FeedAudience!) {
    changeFeedAudience(id: $id, audience: $audience) {
      status
      message
    }
  }
`;

export const HIDE_FEED = gql`
  mutation hideFeed($id: String!, $reason: String!) {
    hideFeed(id: $id, reason: $reason) # returns Feed Id, ["nullable", "string"]
  }
`;

export const LIKE_FEED = gql`
  mutation likeFeed($id: String!) {
    likeFeed(id: $id) {
      id
      type
      isLiked
      isBookmarked
      isPinned
      createdAt
      owner {
        id
        displayName
        username
        avatar
      }
      item {
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

export const UNLIKE_FEED = gql`
  mutation unlikeFeed($id: String!) {
    unlikeFeed(id: $id) {
      id
      type
      isLiked
      isBookmarked
      isPinned
      createdAt
      owner {
        id
        displayName
        username
        avatar
      }
      item {
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
