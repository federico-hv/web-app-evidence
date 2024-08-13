import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_BIO_AND_PERKS } from '../../mutations';
import { useToast } from '../../../../shared';
import { IProfile } from '../../../user';
import { IPerk } from '../../../clubs';

export function useUpdateBioAndPerks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateArtistProfile: IProfile;
      updatePerks: IPerk[];
    },
    { payload: { bio: string }; perks: number[] }
  >(UPDATE_BIO_AND_PERKS);

  const updateBioAndPerks = async (
    clubId: string,
    data: {
      perks: number[];
      bio: string;
    },
  ) => {
    try {
      const result = await mutate({
        variables: {
          perks: data.perks,
          payload: { bio: data.bio },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              clubPerks(current = []) {
                // let newPerksList: Reference[] = current;
                //
                // try {
                //   newPerksList = data?.updatePerks.map((data) => {
                //     return cache.writeFragment({
                //       id: clubId,
                //       fragment: gql`
                //         fragment NewPerks on PerkModel {
                //           id
                //           label
                //           description
                //         }
                //       `,
                //       data: data,
                //     }) as Reference;
                //   }) as Reference[];
                // } catch (e) {
                //   console.error(e);
                // }
                //
                // return {
                //   clubId,
                //   perks: newPerksList,
                // };
              },
              artist(current = {}) {
                let newArtist: Reference = current;

                try {
                  newArtist = cache.writeFragment({
                    id: `ClubModel:${clubId}`,
                    fragment: gql`
                      fragment NewArtist on ArtistModel {
                        bio
                      }
                    `,
                    data: {
                      bio: data?.updateArtistProfile.bio,
                    },
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newArtist;
              },
            },
          });
        },
      });

      // openWith({
      //   status: 'success',
      //   description: 'We have saved your bio and perks',
      // });

      return result;
    } catch (e) {
      console.error(e);

      openWith({
        status: 'danger',
        description: 'Something went wrong. Please try again later.',
      });
    }
  };

  return { updateBioAndPerks, loading, error, data };
}
