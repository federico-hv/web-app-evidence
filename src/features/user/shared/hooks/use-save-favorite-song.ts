import { useMutation } from '@apollo/client';
import { SAVE_FAVORITE_SONG } from '../../mutations';
import { IMusicRelease, ISaveMusicRelease } from '../types';

/**
 * A hook that returns a method to save a music release
 * as a favorite song for the current user.
 */
export function useSaveFavoriteSong() {
  const [mutate, { data, loading, error }] = useMutation<
    IMusicRelease,
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
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { saveFavoriteSong, loading, data, error };
}
