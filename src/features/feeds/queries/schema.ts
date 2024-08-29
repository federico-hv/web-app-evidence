import { gql } from '@apollo/client';

const USER_WITH_RELATIONSHIP_FRAGMENT = gql`
  fragment UserWithRelationshipFragment on UserWithRelationshipModel {
    id
    avatar
    role
    username
    displayName
    relationshipStatusInfo {
      isFollower
      isFollowing
      isRestricted
    }
  }
`;

export const FEED_FRAGMENT = gql`
  fragment FeedFragment on FeedModel {
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
`;

export const GET_FEEDS = gql`
  query feeds(
    $params: StringPaginationParamsInput
    $filter: FeedFilterTypeEnum
    $slug: String
  ) {
    feeds(params: $params, filter: $filter, slug: $slug) {
      edges {
        node {
          ...FeedFragment
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
  ${FEED_FRAGMENT}
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
          ...FeedFragment
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
  ${FEED_FRAGMENT}
`;

export const GET_USERS_WHO_LIKED = gql`
  query UsersWhoLiked(
    $feedId: String!
    $params: StringPaginationParamsInput
  ) {
    usersWhoLiked(feedId: $feedId, params: $params) {
      total
      edges {
        cursor
        node {
          ...UserWithRelationshipFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${USER_WITH_RELATIONSHIP_FRAGMENT}
`;

export const GET_USERS_WHO_BOOKMARKED = gql`
  query UsersWhoLiked(
    $feedId: String!
    $params: StringPaginationParamsInput
  ) {
    usersWhoBookmarked(feedId: $feedId, params: $params) {
      total
      edges {
        cursor
        node {
          ...UserWithRelationshipFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${USER_WITH_RELATIONSHIP_FRAGMENT}
`;

export const GET_FEED = gql`
  query Feed($id: String!) {
    feed(id: $id) {
      ...FeedFragment
    }
  }
  ${FEED_FRAGMENT}
`;

export const GET_USERS_WHO_VOTED = gql`
  query usersWhoVoted(
    $pollAnswerId: Int!
    $postId: Int!
    $params: StringPaginationParamsInput
  ) {
    usersWhoVoted(
      pollAnswerId: $pollAnswerId
      postId: $postId
      params: $params
    ) {
      total
      edges {
        cursor
        node {
          ...UserWithRelationshipFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${USER_WITH_RELATIONSHIP_FRAGMENT}
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
          ...UserWithRelationshipFragment
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
  ${USER_WITH_RELATIONSHIP_FRAGMENT}
`;
