import { useLazyQuery, useQuery, useSuspenseQuery } from '@apollo/client';
import { IProfile } from '../types';
import { GET_PROFILE } from '../../queries';

export function useGetProfile(username: string) {
  return useQuery<{ profile: IProfile }, { username: string }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );
}

export function useSuspenseGetProfile(username: string) {
  return useSuspenseQuery<{ profile: IProfile }, { username: string }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );
}

export function useLazyGetProfile(username: string) {
  return useLazyQuery<{ profile: IProfile }, { username: string }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );
}
