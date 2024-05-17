import { useMutation } from '@apollo/client';
import { IGenre } from '../../../app';
import { UPDATE_USER_GENRES } from '../../mutations';

export function useUpdateUserGenres() {
  const [mutate, { loading, error, data }] = useMutation<
    { updateUserGenres: IGenre[] },
    { genres: number[] }
  >(UPDATE_USER_GENRES);

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
