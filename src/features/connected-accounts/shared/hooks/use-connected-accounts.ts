import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { ConnectorProvider, IConnectedAccount } from '../types';
import { GET_CONNECTED_ACCOUNTS } from '../../queries';

/**
 * Get the connected accounts that a user is connected to.
 *
 * @param names the names of the connected accounts to find
 * @param params the pagination parameters
 */
export function useConnectedAccounts(
  names?: ConnectorProvider[],
  params?: IPaginationParams<number>,
) {
  const { data } = useSuspenseQuery<
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

  return data.connectedAccounts;
}
