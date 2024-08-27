import { gql } from '@apollo/client';

export const CREATE_RELATIONSHIP = gql`
  mutation createRelationship($payload: RelationshipActionInput!) {
    createRelationship(payload: $payload) {
      isBlocked
      isMuted
      isFollower
      isFollowing
      hasFollowRequest
    }
  }
`;

export const REMOVE_RELATIONSHIP = gql`
  mutation removeRelationship($payload: RelationshipActionInput!) {
    removeRelationship(payload: $payload) {
      isBlocked
      isMuted
      isFollower
      isFollowing
      hasFollowRequest
    }
  }
`;

export const ACCEPT_RELATIONSHIP_REQUEST = gql`
  mutation acceptRelationshipRequest($id: Int!) {
    acceptRelationshipRequest(id: $id) {
      status
      message
    }
  }
`;

export const DECLINE_RELATIONSHIP_REQUEST = gql`
  mutation declineRelationshipRequest($id: Int!) {
    declineRelationshipRequest(id: $id) {
      status
      message
    }
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation removeFollower($username: String!) {
    removeFollower(username: $username) {
      isBlocked
      isMuted
      isFollower
      isFollowing
      hasFollowRequest
    }
  }
`;
