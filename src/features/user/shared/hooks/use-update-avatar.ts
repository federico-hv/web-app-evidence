import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE_AVATAR } from '../../mutations';

export function useUpdateAvatar() {
  const [mutate, { loading, error, data }] = useMutation<
    { updateProfile: { avatar: string } },
    {
      payload: { avatar: File };
    }
  >(UPDATE_PROFILE_AVATAR);

  const updateAvatar = async (avatar: File) => {
    try {
      return await mutate({
        variables: { payload: { avatar } },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              artist(current) {
                /* */
              },
              me(current) {
                /* */
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
    } catch (error) {
      // use toast
    }
  };

  return { updateAvatar, loading, error, data };
}
