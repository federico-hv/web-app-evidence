import { gql, Reference, useMutation } from '@apollo/client';
import { REMOVE_FAVORITE_ARTIST } from '../../mutations';
import { ITinyArtist } from '../../../../shared';

export function useRemoveFavoriteArtist() {
  // const currentUser = useCurrentUser();

  const [mutate, { loading, data, error }] = useMutation<
    {
      removeFavoriteArtist: ITinyArtist<number>;
    },
    { id: number }
  >(REMOVE_FAVORITE_ARTIST);

  const removeFavoriteArtist = async (id: number) => {
    try {
      await mutate({
        variables: {
          id,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              profile(current = {}, {}) {
                let newProfile: Reference = current;

                // Trying to get the old favorite songs and remove the song from the list.

                // const oldFavoriteArtists = cache.readFragment({
                //   id: currentUser.username,
                //   fragment: gql`
                //     fragment favoriteArtists on ProfileModel {
                //       favoriteArtists {
                //         id
                //         name
                //         image
                //         artistId
                //         externalIds {
                //           id
                //           provider
                //           externalId
                //           externalUrl
                //         }
                //       }
                //     }
                //   `,
                // }) as ITinyArtist<number>[];

                return newProfile;
              },
            },
          });
        },
      });
    } catch (e) {}
  };

  return { removeFavoriteArtist, loading, data, error };
}
