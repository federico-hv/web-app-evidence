import { ConnectorProvider, IConnectedAccount } from '../shared';
import { IConnection, IPaginationParams } from '../../../shared';
import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_CONNECTED_ACCOUNTS } from './schema';

/**
 * Get the connected accounts that a user is connected to.
 *
 * @param names the names of the connected accounts to find
 * @param params the pagination parameters
 */
export function useConnectedAccountsSuspenseQuery(
  names?: ConnectorProvider[],
  params?: IPaginationParams<number>,
) {
  return useSuspenseQuery<
    {
      connectedAccounts: IConnection<IConnectedAccount, number>;
    },
    { names?: ConnectorProvider[]; params?: IPaginationParams<number> }
  >(GET_CONNECTED_ACCOUNTS, {
    variables: {
      names,
      params,
    },
  });
}

/**
 * Get the connected accounts that a user is connected to.
 *
 * @param names the names of the connected accounts to find
 * @param params the pagination parameters
 */
export function useConnectedAccountsQuery(
  names?: ConnectorProvider[],
  params?: IPaginationParams<number>,
) {
  return useQuery<
    {
      connectedAccounts: IConnection<IConnectedAccount, number>;
    },
    { names?: ConnectorProvider[]; params?: IPaginationParams<number> }
  >(GET_CONNECTED_ACCOUNTS, {
    variables: {
      names,
      params,
    },
  });
}
