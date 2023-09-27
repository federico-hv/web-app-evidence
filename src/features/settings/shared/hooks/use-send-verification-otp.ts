import { useMutation } from '@apollo/client';
import { SEND_VERIFICATION_OTP } from '../../mutations';
import { IStatus } from '../../../../shared';

export function useSendVerificationOTP() {
  const [sendVerificationOTP, { loading, error }] = useMutation<
    { sendVerificationOTP: IStatus },
    {
      payload: {
        contact: string;
        channel: 'sms' | 'email';
      };
    }
  >(SEND_VERIFICATION_OTP);

  const onSubmit = async (data: {
    contact: string;
    channel: 'sms' | 'email';
  }) => {
    return await sendVerificationOTP({
      variables: {
        payload: data,
      },
    });
  };

  return { onSubmit, loading, error };
}
