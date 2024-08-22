import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_PROFILE_AVATAR } from '../../mutations';
import { useCurrentUser } from '../../../auth';
import { GET_PROFILE } from '../../queries';

export function useUpdateAvatar() {
  const currentUser = useCurrentUser();

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
        refetchQueries: [
          {
            query: GET_PROFILE,
            variables: { username: currentUser.username },
          },
        ],
        update(cache, { data }) {
          cache.modify({
            fields: {
              me(current = {}) {
                let newMe = current;

                try {
                  newMe = cache.writeFragment({
                    id: current.__ref,
                    data: { avatar: data?.updateProfile.avatar },
                    fragment: gql`
                      fragment NewMe on MeModel {
                        avatar
                      }
                    `,
                  }) as Reference;

                  // update current user [?? Cache update not going to update avatar]
                  // setCurrentUser((prev) => ({
                  //   ...prev,
                  //   avatar: data?.updateProfile.avatar || prev.avatar,
                  // }));
                } catch (e) {
                  console.error(e);
                }

                return newMe;
              },

              profile(current = {}) {
                let newProfile = current;

                try {
                  newProfile = cache.writeFragment({
                    id: currentUser.username,
                    data: { avatar: data?.updateProfile.avatar },
                    fragment: gql`
                      fragment NewAvatar on ProfileModel {
                        avatar
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }
                return newProfile;
              },

              artist(current = {}) {
                let newArtist: Reference = current;

                try {
                  newArtist = cache.writeFragment({
                    id: current.__ref,
                    data: {
                      avatar: data?.updateProfile.avatar,
                    },
                    fragment: gql`
                      fragment NewArtistAvatar on ArtistModel {
                        avatar
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newArtist;
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
