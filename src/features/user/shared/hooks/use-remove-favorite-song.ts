import { gql, Reference, useMutation } from '@apollo/client';
import { REMOVE_FAVORITE_SONG } from '../../mutations';
import { IMusicRelease } from '../types';

export function useRemoveFavoriteSong() {
  const [mutate, { loading, data, error }] = useMutation<{
    removeFavoriteSong: IMusicRelease;
  }>(REMOVE_FAVORITE_SONG);

  const removeFavoriteSong = async () => {
    try {
      await mutate({
        update(cache, { data }) {
          cache.modify({
            fields: {
              profile(current = {}) {
                let newProfile: Reference = current;

                try {
                  newProfile = cache.writeFragment({
                    id: current.__ref,
                    data: null,
                    fragment: gql`
                      fragment RemoveFavoriteSong on ProfileModel {
                        favoriteSong
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
    } catch (e) {}
  };

  return { removeFavoriteSong, loading, data, error };
}
