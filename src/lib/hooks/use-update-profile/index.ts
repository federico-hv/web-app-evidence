import { useMutation } from '@apollo/client';
import { GET_ME, GET_PROFILE, UPDATE_PROFILE } from '../../gql';
import {
  ProfileFormData,
  UpdateProfileData,
  UpdateProfilePayload,
} from 'shared';

export const useUpdateProfile = () => {
  const [updateProfile, { loading, error }] = useMutation<
    UpdateProfileData,
    UpdateProfilePayload
  >(UPDATE_PROFILE);

  const onSubmit = async (formData: ProfileFormData) => {
    await updateProfile({
      variables: { payload: formData },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            profile(current) {
              const newProfile = data?.updateProfile || {};
              cache.writeQuery({
                query: GET_PROFILE,
                data: { ...current, ...newProfile },
              });
            },
            me(current) {
              const newProfile = data?.updateProfile || {};
              cache.writeQuery({
                query: GET_ME,
                data: { ...current, ...newProfile },
              });
            },
          },
        });
      },
      context: {
        headers: {
          'apollo-require-preflight': true,
        },
      },
    });
  };

  const onFinish = (cb: VoidFunction) => {
    cb();
  };

  return { loading, error, onSubmit, onFinish };
};
