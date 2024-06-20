import { useQuery, useSuspenseQuery } from '@apollo/client';
import { CHECK_IS_UNIQUE_FIELD } from '../../queries';
import { UniqueIdentityField } from '../types';

export function useCheckIsUniqueField() {
  return useQuery<
    { isUniqueField: boolean },
    { field: UniqueIdentityField; value: string }
  >(CHECK_IS_UNIQUE_FIELD);
}

export function useSuspenseCheckIsUniqueField() {
  return useSuspenseQuery<
    { isUniqueField: boolean },
    { field: UniqueIdentityField; value: string }
  >(CHECK_IS_UNIQUE_FIELD);
}
