import {
  ApolloError,
  useLazyQuery,
  useQuery,
  useSuspenseQuery,
} from '@apollo/client';
import { IS_UNIQUE_CLUB_URL } from '../../queries';
import { debounce, DebouncedFunc } from 'lodash';
import { useCallback, useState } from 'react';

export function useIsUniqueClubUrl(url: string) {
  return useQuery<
    { isUniqueClubURL: boolean },
    { url: string; notClub?: string }
  >(IS_UNIQUE_CLUB_URL, { variables: { url } });
}

export function useSuspenseIsUniqueClubUrl(url: string) {
  return useSuspenseQuery<
    { isUniqueClubURL: boolean },
    { url: string; notClub?: string }
  >(IS_UNIQUE_CLUB_URL, { variables: { url } });
}

export function useDebounceIsUniqueClubUrl(): [
  DebouncedFunc<(url: string, id: string) => Promise<void>>,
  {
    result: boolean;
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [result, setResult] = useState<boolean>(true);
  const [query, { loading, error }] = useLazyQuery<
    {
      isUniqueClubURL: boolean;
    },
    { url: string; notClub?: string }
  >(IS_UNIQUE_CLUB_URL);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkIsUnique = useCallback(
    debounce(async (url: string, notClub?: string) => {
      const { data } = await query({
        variables: { url, notClub },
      });

      if (error) setResult(false);

      if (data) setResult(data.isUniqueClubURL);
    }, 350),
    [],
  );

  return [checkIsUnique, { result, error, loading }];
}
