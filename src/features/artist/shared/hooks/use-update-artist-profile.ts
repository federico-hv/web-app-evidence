import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_ARTIST_PROFILE } from '../../mutations';
import { IArtist, IUpdateArtistProfile } from '../types';
import { IProfile } from '../../../user';

export function useUpdateArtistProfile() {
  const [mutate, { loading, error, data }] = useMutation<
    { updateArtistProfile: IArtist },
    { payload: Partial<IProfile> }
  >(UPDATE_ARTIST_PROFILE);

  const updateArtistProfile = async (
    data: Partial<IUpdateArtistProfile>,
  ) => {
    try {
      return await mutate({
        variables: { payload: data },
        update(cache, { data }) {
          cache.modify({
            fields: {
              artist(current = {}) {
                let newArtist: Reference = current;

                try {
                  newArtist = cache.writeFragment({
                    id: current.__ref,
                    data: data?.updateArtistProfile,
                    fragment: gql`
                      fragment NewArtist on ArtistModel {
                        id
                        bio
                        username
                        accountId
                        location
                        avatar
                        name
                        collaborators {
                          name
                        }
                        isVerified
                        socialLinks {
                          url
                          provider
                        }
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(`[updateArtistProfile]: ${e}`);
                }

                return newArtist;
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { updateArtistProfile, loading, data, error };
}
