import { gql } from '@apollo/client';

export const GET_FEEDS = gql`
  query feeds(
    $params: StringPaginationParamsInput
    $filter: FeedFilterTypeEnum
    $slug: String
  ) {
    feeds(params: $params, filter: $filter, slug: $slug) {
      edges {
        node {
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

export const GET_FEED = gql`
  query feed($id: String!) {
    feed(id: $id) {
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

export const GET_TRENDING_FEEDS = gql`
  query TrendingFeeds(
    $params: StringPaginationParamsInput
    $filter: FeedFilterTypeEnum
  ) {
    trendingFeeds(params: $params, filter: $filter) {
      total
      edges {
        node {
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
