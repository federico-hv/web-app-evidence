// useQuery.tsx
import { useEffect, useState } from 'react';

interface UseQueryReturnType<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

/**
 * A hook that queries an API for data.
 *
 * @param baseURL
 * @param endpoint the endpoint to call for data.
 * @param body
 *
 * @returns an object containing:
 * - `data`: The data returned from the API.
 * - `loading`: The loading state, determines whether the server is loading data.
 * - `error`: An error object, if an HTTP error occurs.
 */
export function useQuery<T>(
  baseURL: string,
  endpoint: string,
  body?: BodyInit | null,
): UseQueryReturnType<T> {
  /*
   * example of url: https:dummyjson.com/users/1?skip=0&llimit=10
   **/

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseURL}/${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [body, baseURL, endpoint]);

  return {
    data: data,
    loading: loading,
    error: error,
  };
}
