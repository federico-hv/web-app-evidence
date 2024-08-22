import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { DISABLE_TWO_FA } from './schema';
import { TwoFAChannelEnum } from '../shared';
import { GET_TWO_FA_CHANNEL } from '../queries';

export function useDisableTwoFAMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    {
      disableTwoFA: ISuccessResponse;
    },
    { channel: TwoFAChannelEnum }
  >(DISABLE_TWO_FA);

  const disableTwoFA = async (channel: TwoFAChannelEnum) => {
    try {
      return await mutate({
        variables: { channel },
        refetchQueries: [{ query: GET_TWO_FA_CHANNEL }],
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

  return { disableTwoFA, ...results };
}
