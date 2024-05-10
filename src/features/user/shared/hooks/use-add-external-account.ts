import { useToast } from '../../../../shared';
import { useMutation } from '@apollo/client';
import { ADD_EXTERNAL_ACCOUNT } from '../../mutations';
import { IExternalAccount } from '../interface';

export function useAddExternalAccount() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      addExternalAccount: IExternalAccount;
    },
    { payload: Omit<IExternalAccount, 'id'> }
  >(ADD_EXTERNAL_ACCOUNT);

  const addExternalAccount = async (
    payload: Omit<IExternalAccount, 'id'>,
  ) => {
    try {
      const result = await mutate({
        variables: {
          payload,
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
