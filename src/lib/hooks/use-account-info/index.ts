import { useQuery } from '@apollo/client';
import { IAccountInfo } from 'shared';
import { GET_ACCOUNT_INFO } from '../../gql';

/**
 * Retrieve the current user's account information.
 */
export function useAccountInfo() {
  const { loading, error, data } = useQuery<{
    accountInfo: IAccountInfo;
  }>(GET_ACCOUNT_INFO);

  return { loading, data, error };
}
