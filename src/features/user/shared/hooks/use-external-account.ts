import { useMutation, useSuspenseQuery } from '@apollo/client';
import { GET_EXTERNAL_ACCOUNT } from '../../queries';
import { IExternalAccount } from '../interface';

export function useExternalAccount(provider: string) {
  return useMutation<{ externalAccount: IExternalAccount }>(
    GET_EXTERNAL_ACCOUNT,
    {
      variables: { provider },
    },
  );
}

export function useSuspenseExternalAccount(provider: string) {
  return useSuspenseQuery<{ externalAccount: IExternalAccount }>(
    GET_EXTERNAL_ACCOUNT,
    {
      variables: { provider },
    },
  );
}
