import {
  GET_SOCIAL_LINKS,
  IClub,
  ITinyProfile,
  useCurrentUser,
} from '../../../../../features';
import { gql, Reference, useMutation } from '@apollo/client';
import { ISocialLink } from '../../../../../shared';
import { UPDATE_ARTIST_BIO_AND_LINKS } from './mutations';

export function useUpdateArtistBioAndLinks() {
  const currentUser = useCurrentUser();
  const [mutate, { loading, data, error }] = useMutation<
    {
      updateSocialLinks: ISocialLink;
      updateClub: IClub;
    },
    { links: ISocialLink[]; profile: ITinyProfile }
  >(UPDATE_ARTIST_BIO_AND_LINKS);

  const updateProfileAndLinks = async (
    profile: ITinyProfile,
    links: ISocialLink[],
  ) => {
    try {
      return await mutate({
        variables: {
          links,
          profile,
        },
        refetchQueries: [
          { query: GET_SOCIAL_LINKS, variables: { id: currentUser.id } },
        ],
        update(cache, { data }) {
          cache.modify({
            fields: {
              club(current = {}) {
                let newClub: Reference = current;

                try {
                  newClub = cache.writeFragment({
                    id: newClub.__ref,
                    data: {}, //data?.updateProfile
                    fragment: gql`
                      fragment NewClubArtist on ClubModel {
                        url
                        artist {
                          name
                          bio
                          username
                        }
                      }
                    `,
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
    } catch (e) {
      // throw some error
    }
  };

  return { updateProfileAndLinks, loading, data, error };
}
