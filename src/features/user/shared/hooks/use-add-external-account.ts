import { useToast } from '../../../../shared';
import { gql, Reference, useMutation } from '@apollo/client';
import { ADD_EXTERNAL_ACCOUNT } from '../../mutations';
import { IExternalAccountModel } from '../interface';

export function useAddExternalAccount() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      addExternalAccount: IExternalAccountModel;
    },
    { payload: Omit<IExternalAccountModel, 'id'> }
  >(ADD_EXTERNAL_ACCOUNT);

  const addExternalAccount = async (
    payload: Omit<IExternalAccountModel, 'id'>,
  ) => {
    try {
      const result = await mutate({
        variables: {
          payload,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              externalAccount(current = {}) {
                let newExternalAccount: Reference = current;

                try {
                  newExternalAccount = cache.writeFragment({
                    id: `ExternalAccountModel:${data?.addExternalAccount.id}`,
                    data: data?.addExternalAccount,
                    fragment: gql`
                      fragment NewExternalAccount on ExternalAccount {
                        id
                        externalId
                        provider
                        url
                        username
                        avatar
                      }
                    `,
                  }) as Reference;

                  // remove the previous external account in cache
                  cache.evict({ id: current.__ref });
                } catch (e) {
                  console.error(e);
                }

                return newExternalAccount;
              },
            },
          });
        },
      });

      openWith({
        status: 'success',
        description: 'We have saved your Spotify account',
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

  return { addExternalAccount, loading, error, data };
}
