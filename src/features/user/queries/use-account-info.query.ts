import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_ACCOUNT_INFO } from './schema';
import { IAccountInfo } from '../shared';

export function useAccountInfoQuery() {
  return useQuery<{ accountInfo: IAccountInfo }>(GET_ACCOUNT_INFO);
}

export function useAccountInfoSuspenseQuery() {
  return useSuspenseQuery<{ accountInfo: IAccountInfo }>(GET_ACCOUNT_INFO);
}
