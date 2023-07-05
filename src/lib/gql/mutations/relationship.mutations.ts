import { gql } from '@apollo/client';

export const CREATE_RELATIONSHIP = gql`
  mutation createRelationship($payload: CreateRelationshipInput!) {
    createRelationship(payload: $payload) {
      isBlocked
      isMuted
      isFollowing
      isFavourite
    }
  }
`;

export const REMOVE_RELATIONSHIP = gql`
  mutation removeRelationship($payload: RemoveRelationshipInput!) {
    removeRelationship(payload: $payload) {
      isBlocked
      isMuted
      isFollowing
      isFriend
      isFavourite
    }
  }
`;

export const REQUEST_RELATIONSHIP = gql`
  mutation requestRelationship($payload: RequestRelationshipInput!) {
    requestRelationship(payload: $payload) {
      hasFriendRequest
      hasFollowRequest
    }
  }
`;

export const ACCEPT_RELATIONSHIP_REQUEST = gql`
  mutation acceptRelationshipRequest($id: Int!) {
    acceptRelationshipRequest(id: $id)
  }
`;

export const DECLINE_RELATIONSHIP_REQUEST = gql`
  mutation declineRelationshipRequest($id: Int!) {
    declineRelationshipRequest(id: $id)
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation removeFollower($username: String!) {
    removeFollower(username: $username)
  }
`;
