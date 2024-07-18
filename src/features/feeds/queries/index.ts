import { gql } from '@apollo/client';

export const GET_USER_FEEDS = gql`
  query userFeeds($payload: FeedInput!) {
    userFeeds(payload: $payload) {
      count
      data {
        id
        type
        reaction
        bookmarked
        isPinned
        createdAt
        owner {
          id
          displayName
          username
          avatar
        }
        node {
          ... on PostModel {
            id
            endDate
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
  }
`;

export const GET_FEEDS = gql`
  query feeds($type: String!) {
    feeds(type: $type) {
      count
      data {
        id
        type
        isPinned
        reaction
        bookmarked
        createdAt
        owner {
          id
          displayName
          username
          avatar
        }
        node {
          ... on PostModel {
            id
            endDate
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
            url
            imageUrl
            source {
              name
              url
              logo
            }
          }
        }
      }
    }
  }
`;

export const GET_REACTED_FEEDS = gql`
  query reactedFeeds($username: String!) {
    reactedFeeds(username: $username) {
      count
      data {
        id
        type
        reaction
        isPinned
        bookmarked
        createdAt
        owner {
          id
          displayName
          username
          avatar
        }
        node {
          ... on PostModel {
            id
            endDate
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
            source {
              name
              logo
            }
          }
        }
      }
    }
  }
`;

export const GET_FEED = gql`
  query feed($id: String!) {
    feed(id: $id) {
      id
      type
      isPinned
      reaction
      bookmarked
      createdAt
      owner {
        id
        displayName
        username
        avatar
      }
      node {
        ... on PostModel {
          id
          endDate
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
          url
          description
          imageUrl
          source {
            name
            url
            logo
          }
        }
      }
    }
  }
`;

export const GET_FEED_STATISTIC = gql`
  query feedStatistic($id: String!, $name: FeedStatistic!) {
    feedStatistic(id: $id, name: $name) # count, i.e number of items.
  }
`;

export const GET_FEED_AUDIENCE = gql`
  query feedAudience($id: String!) {
    feedAudience(id: $id) # FeedAudience
  }
`;

export const GET_POLL_VOTES = gql`
  query usersWhoVoted(
    $id: String!
    $params: StringPaginationParamsInput
    $pollId: Int
  ) {
    usersWhoVoted(id: $id, params: $params, pollId: $pollId) {
      edges {
        node {
          id
          username
          avatar
          displayName
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
