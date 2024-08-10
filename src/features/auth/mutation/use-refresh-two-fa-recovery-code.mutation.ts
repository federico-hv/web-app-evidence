import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { REFRESH_TWO_FA_RECOVERY_CODE } from './schema';
import { GET_TWO_FA_RECOVERY_KEY } from '../queries';

export function useRefreshTwoFARecoveryCodeMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<{
    refreshTwoFARecoveryKey: string;
  }>(REFRESH_TWO_FA_RECOVERY_CODE);

  const refreshTwoFARecoveryCode = async () => {
    try {
      return await mutate({
        refetchQueries: [{ query: GET_TWO_FA_RECOVERY_KEY }],
      });
    } catch (e: any) {
      const errorMessage = e.message ?? ErrorMessage.Any;

      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.error(e);
      }

      openWith({
        status: 'danger',
        description: errorMessage,
      });
    }
  };

  return { refreshTwoFARecoveryCode, ...results };
}
