import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_PROFILE_AND_LINKS } from '../../mutations';
import { ISocialLink } from '../../../../shared';
import { ITinyProfile } from '../../../../router/routes/edit-general-user-profile.routes';
import { useCurrentUser } from '../../../auth';
import { IProfile } from '../types';

export function useUpdateProfileAndLinks() {
  const currentUser = useCurrentUser();
  const [mutate, { loading, data, error }] = useMutation<
    { updateProfile: IProfile; updateSocialLinks: ISocialLink },
    { links: ISocialLink[]; profile: ITinyProfile }
  >(UPDATE_PROFILE_AND_LINKS);

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
        update(cache, { data }) {
          cache.modify({
            fields: {
              profile(current = {}) {
                let newProfile: Reference = current;

                try {
                  newProfile = cache.writeFragment({
                    id: currentUser.username,
                    data: data?.updateProfile,
                    fragment: gql`
                      fragment NewFavoriteArtist on ProfileModel {
                        displayName
                        username
                        avatar
                        bio
                        protected
                        location
                        following
                        followers
                        favoriteSong {
                          id
                          name
                          coverImage
                          artists
                          externalIds {
                            id
                            provider
                            externalId
                          }
                        }
                        favoriteArtists {
                          id
                          name
                          image
                          artistId
                          externalIds {
                            id
                            provider
                            externalId
                            externalUrl
                          }
                        }
                        socialLinks {
                          provider
                          url
                        }
                      }
                    `,
                  }) as Reference;
                } catch (e) {
                  console.error(e);
                }

                return newProfile;
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
