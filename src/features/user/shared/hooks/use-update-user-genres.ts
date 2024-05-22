import { gql, Reference, useMutation } from '@apollo/client';
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
        update(cache, { data }) {
          cache.modify({
            fields: {
              userGenres(current = []) {
                let newPerksList: Reference[] = current;

                try {
                  newPerksList = data?.updateUserGenres.map(
                    ({ id, label }) => {
                      return cache.writeFragment({
                        id: `GenreModel:${id}`,
                        fragment: gql`
                          fragment NewGenreModel on GenreModel {
                            id
                            label
                          }
                        `,
                        data: {
                          id,
                          label,
                        },
                      }) as Reference;
                    },
                  ) as Reference[];
                } catch (e) {
                  console.error(e);
                }

                return [...newPerksList];
              },
            },
          });
        },
      });
    } catch (error) {
      console.error(error);
      // show Toast
    }
  };

  return { updateGenres, loading, error, data };
}
