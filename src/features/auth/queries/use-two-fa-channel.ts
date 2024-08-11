import { useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_TWO_FA_CHANNEL } from './schema';
import { TwoFAChannelEnum } from '../shared';

export function useTwoFaChannelQuery() {
  return useQuery<{ twoFAChannel: TwoFAChannelEnum }>(GET_TWO_FA_CHANNEL);
}

export function useTwoFaChannelSuspenseQuery() {
  return useSuspenseQuery<{ twoFAChannel: TwoFAChannelEnum }>(
    GET_TWO_FA_CHANNEL,
  );
}
