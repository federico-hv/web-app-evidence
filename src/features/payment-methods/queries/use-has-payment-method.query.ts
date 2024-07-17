import { useQuery, useSuspenseQuery } from '@apollo/client';
import { CHECK_HAS_PAYMENT_METHOD } from './schema';

function useHasPaymentMethodQuery() {
  return useQuery<{ hasPaymentMethod: boolean }>(CHECK_HAS_PAYMENT_METHOD);
}

function useHasPaymentMethodSuspenseQuery() {
  return useSuspenseQuery<{ hasPaymentMethod: boolean }>(
    CHECK_HAS_PAYMENT_METHOD,
  );
}

export { useHasPaymentMethodQuery, useHasPaymentMethodSuspenseQuery };
