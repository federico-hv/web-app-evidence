import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { VerificationChannelEnum } from '../enums';
import { CHECK_VERIFICATION_CODE } from './schema';

interface ICheckVerificationCodePayload {
  recipient: string;
  channel: VerificationChannelEnum;
  code: string;
}

export function useCheckVerificationCodeMutation() {
  const { openWith } = useToast();

  const [mutate, result] = useMutation<
    { checkVerificationCode: ISuccessResponse },
    { payload: ICheckVerificationCodePayload }
  >(CHECK_VERIFICATION_CODE);

  const checkVerificationCode = async (
    payload: ICheckVerificationCodePayload,
  ) => {
    try {
      return await mutate({
        variables: { payload },
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

  return { checkVerificationCode, ...result };
}
