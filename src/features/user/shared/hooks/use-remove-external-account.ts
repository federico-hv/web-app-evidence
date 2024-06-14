import { useToast } from '../../../../shared';
import { useMutation } from '@apollo/client';
import { IExternalAccountModel } from '../interface';
import { REMOVE_EXTERNAL_ACCOUNT } from '../../mutations';

export function useRemoveExternalAccount() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      removeExternalAccount: IExternalAccountModel;
    },
    { id: number }
  >(REMOVE_EXTERNAL_ACCOUNT);

  const removeExternalAccount = async (id: number) => {
    try {
      const result = await mutate({
        variables: {
          id,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              externalAccount(current = {}) {
                cache.evict({ id: current.__ref });

                return;
              },
            },
          });
        },
      });

      return result;
    } catch (e) {
      console.error(e);

      openWith({
        status: 'danger',
        description: 'Something went wrong. Please try again later.',
      });
    }
  };

  return { removeExternalAccount, loading, error, data };
}
