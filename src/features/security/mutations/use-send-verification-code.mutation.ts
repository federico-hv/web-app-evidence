import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { VerificationChannelEnum } from '../enums';
import { SEND_VERIFICATION_CODE } from './schema';

export function useSendVerificationCodeMutation() {
  const { openWith } = useToast();

  const [mutate, result] = useMutation<
    { sendVerificationCode: ISuccessResponse },
    { recipient: string; channel: VerificationChannelEnum }
  >(SEND_VERIFICATION_CODE);

  const sendVerificationCode = async (
    recipient: string,
    channel: VerificationChannelEnum,
  ) => {
    try {
      return await mutate({
        variables: { recipient, channel },
      });
    } catch (e) {
      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { sendVerificationCode, ...result };
}
