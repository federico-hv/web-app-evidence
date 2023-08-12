import { useQuery } from '@apollo/client';
import { GET_SEARCH_HISTORY } from '../../queries';
import { IReturnMany } from '../../../../shared';

export function useSearchHistory<T>() {
  const { loading, data, error } = useQuery<{
    searchHistory: IReturnMany<T>;
  }>(GET_SEARCH_HISTORY);

  if (data) {
    return { history: data.searchHistory, loading, error };
  }

  return { history: { count: 0, data: [] }, loading, error };
}
