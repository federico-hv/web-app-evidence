import { useToast } from '../../../../shared';
import { useMutation } from '@apollo/client';
import { IExternalAccount } from '../interface';
import { REMOVE_EXTERNAL_ACCOUNT } from '../../mutations';

export function useRemoveExternalAccount() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      removeExternalAccount: IExternalAccount;
    },
    { id: number }
  >(REMOVE_EXTERNAL_ACCOUNT);

  const removeExternalAccount = async (id: number) => {
    try {
      const result = await mutate({
        variables: {
          id,
        },
      });

      // openWith({
      //   status: 'success',
      //   description: 'We have saved your bio and perks',
      // });

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
