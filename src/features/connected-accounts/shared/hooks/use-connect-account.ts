import { useMutation } from '@apollo/client';
import { CONNECT_ACCOUNT } from '../../mutations';
import { IStatus, SocialProviderName } from '../../../../shared';

interface IConnectAccountInput {
  socialProvider: SocialProviderName;
  socialId: string;
  accessToken: string;
  refreshToken: string;
}

export function useConnectAccount() {
  const [mutate, { loading, error }] = useMutation<
    { connectAccount: IStatus },
    {
      payload: IConnectAccountInput;
    }
  >(CONNECT_ACCOUNT);

  const connectAccount = async (payload: IConnectAccountInput) => {
    return mutate({ variables: { payload } });
  };

  return { connectAccount, loading, error };
}
