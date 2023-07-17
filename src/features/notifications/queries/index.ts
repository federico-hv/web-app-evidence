import { gql } from '@apollo/client';

export const GET_REQUESTS = gql`
  query relationshipRequests {
    relationshipRequests {
      id
      requestType
      requester {
        id
        username
        displayName
        avatar
      }
    }
  }
`;
