import { useMutation } from '@apollo/client';
import {
  UpdatePasswordData,
  UpdatePasswordFormData,
  UpdatePasswordPayload,
} from 'shared';
import { UPDATE_PASSWORD } from '../../gql';

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
