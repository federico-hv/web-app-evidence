import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';

import { UPDATE_PASSWORD } from './schema';

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
  newPasswordVerification: string;
}

export function useUpdatePasswordMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { updatePassword: ISuccessResponse },
    { payload: UpdatePasswordPayload }
  >(UPDATE_PASSWORD);

  const updatePassword = async (payload: UpdatePasswordPayload) => {
    try {
      return await mutate({
        variables: { payload },
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

  return { updatePassword, ...results };
}
