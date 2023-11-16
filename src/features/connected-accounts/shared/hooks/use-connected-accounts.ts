import { useSuspenseQuery } from '@apollo/client';
import { IConnection, IPaginationParams } from '../../../../shared';
import { ConnectorProvider, IConnectedAccount } from '../types';
import { GET_CONNECTED_ACCOUNTS } from '../../queries';

export function useConnectedAccounts(
  name?: ConnectorProvider,
  params?: IPaginationParams<number>,
) {
  const { data } = useSuspenseQuery<
    {
      connectedAccounts: IConnection<IConnectedAccount, number>;
    },
    { name?: ConnectorProvider; params?: IPaginationParams<number> }
  >(GET_CONNECTED_ACCOUNTS, {
    variables: {
      name,
      params,
    },
  });

  return data.connectedAccounts;
}
