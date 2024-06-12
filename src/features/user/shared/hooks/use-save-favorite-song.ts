import { gql, Reference, useMutation } from '@apollo/client';
import { SAVE_FAVORITE_SONG } from '../../mutations';
import { IMusicRelease, ISaveMusicRelease } from '../types';
import { useCurrentUser } from '../../../auth';

/**
 * A hook that returns a method to save a music release
 * as a favorite song for the current user.
 */
export function useSaveFavoriteSong() {
  const currentUser = useCurrentUser();

  const [mutate, { data, loading, error }] = useMutation<
    { saveFavoriteSong: IMusicRelease },
    {
      payload: ISaveMusicRelease;
    }
  >(SAVE_FAVORITE_SONG);

  const saveFavoriteSong = async (payload: ISaveMusicRelease) => {
    try {
      return await mutate({
        variables: {
          payload,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              profile(current = {}) {
                let newProfile: Reference = current;

                try {
                  newProfile = cache.writeFragment({
                    id: currentUser.username,
                    data: data?.saveFavoriteSong,
                    fragment: gql`
                      fragment NewFavoriteSong on ProfileModel {
                        favoriteSong {
                          id
                          name
                          coverImage
                          artists
                          externalIds {
                            provider
                            externalId
                          }
                        }
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newProfile;
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { saveFavoriteSong, loading, data, error };
}
