import { useMutation } from '@apollo/client';
import { ADD_CONNECT_ACCOUNT } from '../../mutations';
import { IStatus, SocialProviderName } from '../../../../shared';

interface IConnectAccountInput {
  socialProvider: SocialProviderName;
  socialId: string;
  accessToken: string;
  refreshToken: string;
}

export function useAddConnectedAccount() {
  const [mutate, { loading, error }] = useMutation<
    { addConnectedAccount: IStatus },
    {
      payload: IConnectAccountInput;
    }
  >(ADD_CONNECT_ACCOUNT);

  const addConnectedAccount = async (payload: IConnectAccountInput) => {
    return mutate({ variables: { payload } });
  };

  return { addConnectedAccount, loading, error };
}
