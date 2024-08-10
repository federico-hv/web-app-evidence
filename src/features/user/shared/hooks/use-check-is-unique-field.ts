import {
  ApolloError,
  useLazyQuery,
  useQuery,
  useSuspenseQuery,
} from '@apollo/client';
import { CHECK_IS_UNIQUE_FIELD } from '../../queries';
import { UniqueIdentityField } from '../types';
import { debounce, DebouncedFunc } from 'lodash';
import { useCallback, useState } from 'react';

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

export function useDebouncedCheckIsUniqueField(): [
  DebouncedFunc<
    (value: string, field: UniqueIdentityField) => Promise<void>
  >,
  {
    isUnique: boolean | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [result, setResult] = useState<boolean>();
  const [query, { loading, error }] = useLazyQuery<
    { isUniqueField: boolean },
    { field: UniqueIdentityField; value: string }
  >(CHECK_IS_UNIQUE_FIELD);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const check = useCallback(
    debounce(async (value: string, field: UniqueIdentityField) => {
      const { data } = await query({
        variables: { value, field },
      });

      if (error) setResult(undefined);

      if (data) setResult(data.isUniqueField);
    }, 300),
    [],
  );

  return [check, { isUnique: result, error, loading }];
}
