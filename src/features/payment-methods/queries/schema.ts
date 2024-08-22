import { gql } from '@apollo/client';

export const CHECK_HAS_PAYMENT_METHOD = gql`
  query hasPaymentMethod {
    hasPaymentMethod
  }
`;

export const GET_PAYMENT_METHODS = gql`
  query PaymentMethods {
    paymentMethods {
      id
      card {
        last4
        expires
        displayBrand
        brand
      }
    }
  }
`;

export const GET_PAST_TRANSACTIONS = gql`
  query PastTransactions($params: NumberPaginationParamsInput) {
    pastTransactions(params: $params) {
      total
      edges {
        node {
          id
          createdAt
          amount
          club {
            id
            name
            url
          }
          card {
            last4
            expires
            displayBrand
            brand
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
