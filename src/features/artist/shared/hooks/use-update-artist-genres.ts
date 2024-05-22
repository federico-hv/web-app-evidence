import { gql, Reference, useMutation } from '@apollo/client';
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
        update(cache, { data }) {
          cache.modify({
            fields: {
              artistGenres(current = []) {
                let newPerksList: Reference[] = current;

                try {
                  newPerksList = data?.updateArtistGenres.map(
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
