import { useMutation, useSuspenseQuery } from '@apollo/client';
import { GET_EXTERNAL_ACCOUNT } from '../../queries';
import { IExternalAccountModel } from '../interface';

export function useExternalAccount(provider: string) {
  return useMutation<{ externalAccount: IExternalAccountModel }>(
    GET_EXTERNAL_ACCOUNT,
    {
      variables: { provider },
    },
  );
}

export function useSuspenseExternalAccount(provider: string) {
  return useSuspenseQuery<{ externalAccount: IExternalAccountModel }>(
    GET_EXTERNAL_ACCOUNT,
    {
      variables: { provider },
    },
  );
}
