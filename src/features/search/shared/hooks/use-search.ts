import { ApolloError, useLazyQuery } from '@apollo/client';
import { IReturnMany } from '../../../../shared';
import { SEARCH } from '../../queries';
import { useCallback, useState } from 'react';
import { debounce, DebouncedFunc } from 'lodash';

export function useSearch<T>(): [
  DebouncedFunc<(newValue: string) => Promise<void>>,
  {
    results: T[];
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [results, setResults] = useState<T[]>([]);
  const [query, { loading, error }] = useLazyQuery<
    {
      search: IReturnMany<T>;
    },
    { queryString: string }
  >(SEARCH);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (newValue: string) => {
      const { data } = await query({
        variables: { queryString: newValue },
      });

      if (error) setResults([]);

      if (data) setResults(data.search.data);
    }, 300),
    [],
  );

  // TODO: use this method to return data from mutations
  return [search, { results, error, loading }];
}
