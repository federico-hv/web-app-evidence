import { useMutation } from '@apollo/client';
import { GET_2FA_RECOVERY_KEY, REFRESH_2FA_RECOVERY_KEY } from '../../gql';

export function useRefresh2FARecoveryKey() {
  const [mutation, { loading, error }] = useMutation<{
    refreshTwoFARecoveryKey: string;
  }>(REFRESH_2FA_RECOVERY_KEY);

  const refresh2FARecoveryKey = async () => {
    await mutation({
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            twoFARecoveryKey() {
              const newKey = data?.refreshTwoFARecoveryKey;
              cache.writeQuery({
                query: GET_2FA_RECOVERY_KEY,
                data: { twoFARecoveryKey: newKey },
              });
            },
          },
        });
      },
    });
  };

  return { refresh2FARecoveryKey, loading, error };
}
