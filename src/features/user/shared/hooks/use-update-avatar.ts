import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_PROFILE_AVATAR } from '../../mutations';
import { useCurrentUser } from '../../../auth';

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

              club(current = {}) {
                let newClub: Reference = current;

                try {
                  newClub = cache.writeFragment({
                    id: current.__ref,
                    data: {
                      artist: {
                        avatar: data?.updateProfile.avatar,
                      },
                    },
                    fragment: gql`
                      fragment NewArtistAvatar on ClubModel {
                        artist {
                          avatar
                        }
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newClub;
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
