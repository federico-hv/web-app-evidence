import { ErrorMessage, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { TWO_FA_APP_REGISTRATION } from './schema';

export interface ITwoFAAppRegistrationResponse {
  code: string;
  qrCodeUrl: string;
}

export function useTwoFaRegistrationMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<{
    twoFAAppRegistration: ITwoFAAppRegistrationResponse;
  }>(TWO_FA_APP_REGISTRATION);

  const twoFARegistration = async () => {
    try {
      return await mutate();
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

  return { twoFARegistration, ...results };
}
