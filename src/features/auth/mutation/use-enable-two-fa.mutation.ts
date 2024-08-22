import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { ENABLE_TWO_FA } from './schema';
import { TwoFAChannelEnum } from '../shared';
import { GET_TWO_FA_CHANNEL } from '../queries';

interface IEnableTwoFAArgs {
  channel: TwoFAChannelEnum;
  code: string;
}

export function useEnableTwoFAMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    {
      enableTwoFA: ISuccessResponse;
    },
    { payload: IEnableTwoFAArgs }
  >(ENABLE_TWO_FA);

  const enableTwoFA = async (payload: IEnableTwoFAArgs) => {
    try {
      return await mutate({
        variables: { payload },
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

  return { enableTwoFA, ...results };
}
