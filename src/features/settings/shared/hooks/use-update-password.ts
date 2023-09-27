import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../mutations';
import {
  UpdatePasswordData,
  UpdatePasswordFormData,
  UpdatePasswordPayload,
} from '../types';
import { useToast } from '../../../../shared';

export const useUpdatePassword = () => {
  const { openWith } = useToast();
  const [updatePassword, { data, loading, error }] = useMutation<
    UpdatePasswordData,
    UpdatePasswordPayload
  >(UPDATE_PASSWORD);

  const onSubmit = async (formData: UpdatePasswordFormData) => {
    await updatePassword({
      variables: { payload: formData },
    });
  };

  if (error) {
    openWith({
      status: 'danger',
      description: error.message,
    });
  }

  const onFinish = (cb: VoidFunction) => {
    cb();
  };

  return { data, loading, error, onSubmit, onFinish };
};
