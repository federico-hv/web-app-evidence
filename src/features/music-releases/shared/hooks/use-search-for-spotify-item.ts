import { debounce, DebouncedFunc } from 'lodash';
import {
  ApolloError,
  DocumentNode,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client';
import { useCallback, useState } from 'react';

export function useSearchForSpotifyItem<T>(
  QueryDocument: DocumentNode | TypedDocumentNode,
): [
  DebouncedFunc<(newValue: string) => Promise<void>>,
  {
    data: T | undefined;
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [data, setData] = useState<T>();
  const [query, { loading, error }] = useLazyQuery<
    T,
    {
      queryString: string;
      limit?: number;
      offset?: number;
    }
  >(QueryDocument);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (newValue: string) => {
      const { data } = await query({
        variables: { queryString: newValue, limit: 5, offset: 0 },
      });

      if (data) setData(data);
    }, 500),
    [],
  );

  return [search, { data, error, loading }];
}
