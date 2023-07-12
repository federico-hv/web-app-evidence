import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../mutations';
import {
  UpdatePasswordData,
  UpdatePasswordFormData,
  UpdatePasswordPayload,
} from '../types';

export const useUpdatePassword = () => {
  const [updatePassword, { data, loading, error }] = useMutation<
    UpdatePasswordData,
    UpdatePasswordPayload
  >(UPDATE_PASSWORD);

  const onSubmit = async (formData: UpdatePasswordFormData) => {
    await updatePassword({
      variables: { payload: formData },
    });
  };

  const onFinish = (cb: VoidFunction) => {
    cb();
  };

  return { data, loading, error, onSubmit, onFinish };
};
