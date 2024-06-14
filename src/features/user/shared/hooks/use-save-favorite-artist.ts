import { gql, Reference, useMutation } from '@apollo/client';
import { SAVE_FAVORITE_ARTIST } from '../../mutations';
import { ITinyArtist } from '../../../../shared';
import { ISaveFavoriteArtist } from '../types';
import { useCurrentUser } from '../../../auth';

export function useSaveFavoriteArtist() {
  const currentUser = useCurrentUser();

  const [mutate, { loading, error, data }] = useMutation<
    {
      saveFavoriteArtist: ITinyArtist<number>;
    },
    { payload: ISaveFavoriteArtist }
  >(SAVE_FAVORITE_ARTIST);

  const saveFavoriteArtist = async (payload: ISaveFavoriteArtist) => {
    try {
      await mutate({
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
                    data: data?.saveFavoriteArtist,
                    fragment: gql`
                      fragment NewFavoriteArtist on ProfileModel {
                        favoriteArtists {
                          id
                          name
                          image
                          artistId
                          externalIds {
                            provider
                            externalId
                            externalUrl
                          }
                        }
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error('[CacheModification]: Profile: ', e);
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

  return { saveFavoriteArtist, loading, error, data };
}
