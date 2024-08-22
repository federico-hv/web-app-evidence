import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_PAYMENT_METHODS } from './schema';
import { IPaymentMethod } from '../shared';

export function usePaymentMethodsQuery() {
  return useQuery<{ paymentMethods: IPaymentMethod }>(GET_PAYMENT_METHODS);
}

export function usePaymentMethodsSuspenseQuery() {
  return useSuspenseQuery<{ paymentMethods: IPaymentMethod }>(
    GET_PAYMENT_METHODS,
  );
}
