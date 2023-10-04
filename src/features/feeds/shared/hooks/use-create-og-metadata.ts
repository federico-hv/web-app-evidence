import { useMutation } from '@apollo/client';
import { CREATE_OG_METADATA } from '../../mutations';
import { OgMetadata, useToast } from '../../../../shared';

export function useCreateOgMetadata() {
  const { openWith } = useToast();

  const [mutation, { loading, error, data }] = useMutation<
    { ogMetadata: OgMetadata },
    { url: string }
  >(CREATE_OG_METADATA);

  const createOgMetadata = async (url: string) => {
    const result = await mutation({ variables: { url } });

    return result.data?.ogMetadata;
  };

  if (error) {
    openWith({
      status: 'danger',
      description: 'Oops, something went wrong. Please try again later.',
    });
  }

  return { loading, data, error, createOgMetadata };
}
