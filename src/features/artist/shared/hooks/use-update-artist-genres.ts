import { useMutation } from '@apollo/client';
import { UPDATE_ARTIST_GENRES } from '../../mutations';
import { IGenre } from '../../../app';

export function useUpdateArtistGenres() {
  const [mutate, { loading, error, data }] = useMutation<
    { updateArtistGenres: IGenre[] },
    { genres: number[] }
  >(UPDATE_ARTIST_GENRES);

  const updateGenres = async (genres: number[]) => {
    try {
      return await mutate({
        variables: {
          genres,
        },
      });
    } catch (error) {
      console.error(error);
      // show Toast
    }
  };

  return { updateGenres, loading, error, data };
}
