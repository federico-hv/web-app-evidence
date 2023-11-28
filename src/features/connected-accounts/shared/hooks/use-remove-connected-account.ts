import { useMutation } from '@apollo/client';
import { IConnection } from '../../../../shared';
import { REMOVE_CONNECTED_ACCOUNT } from '../../mutations';
import { IConnectedAccount } from '../types';

export function useRemoveConnectedAccount() {
  const [mutate, { loading, error }] = useMutation<
    { removeConnectedAccount: IConnectedAccount },
    {
      id: number;
    }
  >(REMOVE_CONNECTED_ACCOUNT);

  const removeConnectedAccount = async (id: number) => {
    return mutate({
      variables: { id },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            connectedAccounts(oldItems): any {
              if (!data) return;

              const _oldItems: IConnection<IConnectedAccount, number> =
                oldItems;

              const newEdges = oldItems.edges.filter(
                ({ node }: { node: IConnectedAccount }) =>
                  node.id === data.removeConnectedAccount.id,
              );

              return {
                ..._oldItems,
                edges: newEdges,
              };
            },
          },
        });
      },
    });
  };

  return { removeConnectedAccount, loading, error };
}
