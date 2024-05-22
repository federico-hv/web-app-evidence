import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../../../mutations';
import { GET_PROFILE } from '../../../queries';
import { useToast } from '../../../../../shared';
import { UpdateProfileData } from '../../types';
import { ProfileFormData, UpdateProfilePayload } from '../../../../user';
import { GET_ME } from '../../../../auth';

export const useEditProfile = () => {
  const [updateProfile, { loading, error }] = useMutation<
    UpdateProfileData,
    UpdateProfilePayload
  >(UPDATE_PROFILE);

  const { openWith } = useToast();

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

  if (error) {
    openWith({
      description: 'Oops! Something went wrong. Please try again.',
      status: 'danger',
    });
  }

  const onFinish = (cb: VoidFunction) => {
    cb();
  };

  return { loading, error, onSubmit, onFinish };
};
