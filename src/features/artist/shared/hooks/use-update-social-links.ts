import { useToast } from '../../../../shared';
import { gql, Reference, useMutation } from '@apollo/client';
import { UPDATE_SOCIAL_LINKS } from '../../mutations';
import { ISocialLink } from '../types';

export function useUpdateSocialLinks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateSocialLink: ISocialLink[];
    },
    { links: ISocialLink[] }
  >(UPDATE_SOCIAL_LINKS);

  const updateSocialLink = async (
    artistId: string,
    links: ISocialLink[],
  ) => {
    try {
      const result = await mutate({
        variables: {
          links,
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              socialLinks(current = []) {
                let newSocialLinks: Reference[] = [];

                try {
                  newSocialLinks = data?.updateSocialLink.map(
                    (socialLink) => {
                      return cache.writeFragment({
                        variables: {
                          id: artistId,
                        },
                        fragment: gql`
                          fragment NewSocialLink on SocialLinkModel {
                            url
                            provider
                          }
                        `,
                        data: socialLink,
                      }) as Reference;
                    },
                  ) as Reference[];
                } catch (e) {
                  console.error(e);
                }

                return [...current, ...newSocialLinks];
              },
            },
          });
        },
      });

      // openWith({
      //   status: 'success',
      //   description: 'We have saved social links.',
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

  return { updateSocialLink, loading, error, data };
}
