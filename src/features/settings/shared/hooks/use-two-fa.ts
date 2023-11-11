import { useMutation } from '@apollo/client';
import { IStatus, useToast } from '../../../../shared';
import {
  EnableTwoFAInput,
  TwoFAAppRegistrationModel,
  TwoFAChannel,
} from '../types';
import {
  DISABLE_TWO_FA,
  ENABLE_TWO_FA,
  TWO_FA_APP_REGISTRATION,
} from '../../mutations';
import { GET_TWO_FA_CHANNEL } from '../../queries';

/**
 *
 */
export function useRegisterTwoFAChannel() {
  const { openWith } = useToast();

  const [register, { loading, error, data }] = useMutation<{
    twoFAAppRegistration: TwoFAAppRegistrationModel;
  }>(TWO_FA_APP_REGISTRATION);

  if (error) {
    openWith({ description: error.message });
  }

  return { register, loading, error, data };
}

/**
 *
 */
export function useDisableTwoFA() {
  const [mutate, { loading, error, data }] = useMutation<
    { disableTwoFA: IStatus },
    { channel: TwoFAChannel }
  >(DISABLE_TWO_FA);

  const disableTwoFA = async (
    channel: TwoFAChannel,
    cb?: VoidFunction,
  ) => {
    const { data } = await mutate({
      variables: {
        channel: channel,
      },
      update: (cache) => {
        cache.modify({
          fields: {
            twoFAChannel() {
              cache.writeQuery({
                query: GET_TWO_FA_CHANNEL,
                data: '',
              });
            },
          },
        });
      },
    });

    if (data && data.disableTwoFA.status) {
      cb && cb();
    }
  };

  return { loading, error, data, disableTwoFA };
}

/**
 *
 */
export function useEnableTwoFA() {
  const { openWith } = useToast();
  const [mutate, { loading: loading, error, data }] = useMutation<
    {
      enableTwoFA: IStatus;
    },
    { payload: EnableTwoFAInput }
  >(ENABLE_TWO_FA);

  const enableTwoFA = async (code: string) => {
    const { data } = await mutate({
      variables: {
        payload: {
          code: code,
          channel: 'app',
        },
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            twoFAChannel(current) {
              const channel = data?.enableTwoFA.status ? 'app' : current;
              cache.writeQuery({
                query: GET_TWO_FA_CHANNEL,
                data: channel,
              });
            },
          },
        });
      },
    });

    if (data && !data.enableTwoFA.status) {
      openWith({
        description: data.enableTwoFA.message,
        status: 'danger',
      });
    }

    return { data };
  };

  return { enableTwoFA, loading, error, data };
}
