import { useMutation } from '@apollo/client';
import { SEND_VERIFICATION_OTP } from '../../gql';

export function useSendVerificationOTP() {
  const [sendVerificationOTP, { loading, error }] = useMutation(
    SEND_VERIFICATION_OTP,
  );

  const onSubmit = async (data: {
    contact: string;
    channel: 'sms' | 'email';
  }) => {
    await sendVerificationOTP({
      variables: {
        payload: data,
      },
    });
  };

  return { onSubmit, loading, error };
}
