import { useMutation } from '@apollo/client';
import { CREATE_CUSTOM_ACCOUNT_SESSION } from '../../mutations';

interface IAccountSessionModel {
  account: string;
  client_secret: string;
  expires_at: number;
  livemode: boolean;
}

export function useCreateCustomAccountSession() {
  const [mutate, { loading, error, data }] = useMutation<{
    createCustomAccountSession: IAccountSessionModel;
  }>(CREATE_CUSTOM_ACCOUNT_SESSION);

  const createSession = async () => {
    try {
      return await mutate();
    } catch (error) {
      console.error(error);
      throw Error('Failed to create a session.');
    }
  };

  return { createSession, loading, error, data };
}
