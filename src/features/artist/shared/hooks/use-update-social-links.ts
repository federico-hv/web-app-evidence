import { useToast } from '../../../../shared';
import { useMutation } from '@apollo/client';
import { UPDATE_SOCIAL_LINKS } from '../../mutations';
import { ISocialLink } from '../interface';

export function useUpdateSocialLinks() {
  const { openWith } = useToast();

  const [mutate, { loading, error, data }] = useMutation<
    {
      updateSocialLinks: ISocialLink[];
    },
    { links: ISocialLink[] }
  >(UPDATE_SOCIAL_LINKS);

  const updateSocialLink = async (links: ISocialLink[]) => {
    try {
      const result = await mutate({
        variables: {
          links,
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
