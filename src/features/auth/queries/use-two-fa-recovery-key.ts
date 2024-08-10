import { useQuery, useSuspenseQuery } from '@apollo/client';
import { TwoFAChannelEnum } from '../shared';
import { GET_TWO_FA_RECOVERY_KEY } from './schema';

export function useTwoFARecoveryKeyQuery() {
  return useQuery<{ twoFARecoveryKey: TwoFAChannelEnum }>(
    GET_TWO_FA_RECOVERY_KEY,
  );
}

export function useTwoFARecoveryKeySuspenseQuery() {
  return useSuspenseQuery<{ twoFARecoveryKey: TwoFAChannelEnum }>(
    GET_TWO_FA_RECOVERY_KEY,
  );
}
