import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_BIO_AND_PERKS } from '../../mutations';
import { useToast } from '../../../../shared';
import { IProfile } from '../../../relationships';

export function useUpdateBioAndPerks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateProfile: IProfile;
      updatePerks: number[];
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
                let newPerksList: Reference[] = current;

                try {
                  newPerksList = data?.updatePerks.map((id) => {
                    return cache.writeFragment({
                      id: `ClubModel:${clubId}`,
                      fragment: gql`
                        fragment NewPerks on PerkModel {
                          id
                        }
                      `,
                      data: {
                        id,
                      },
                    }) as Reference;
                  }) as Reference[];
                } catch (e) {
                  console.error(e);
                }

                return [...newPerksList];
              },
              club(current = {}) {
                let newClub: Reference = current;

                try {
                  newClub = cache.writeFragment({
                    id: `ClubModel:${clubId}`,
                    fragment: gql`
                      fragment NewClub on ClubModel {
                        artist {
                          bio
                        }
                      }
                    `,
                    data: {
                      artist: {
                        bio: data?.updateProfile.bio,
                      },
                    },
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newClub;
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
