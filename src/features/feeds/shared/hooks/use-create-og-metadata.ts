import { useMutation } from '@apollo/client';
import { CREATE_OG_METADATA } from '../../mutations';
import { OgMetadata } from '../../../../shared';

export function useCreateOgMetadata() {
  const [mutation, { loading, error, data }] = useMutation<
    { ogMetadata: OgMetadata },
    { url: string }
  >(CREATE_OG_METADATA);

  const createOgMetadata = async (url: string) => {
    const result = await mutation({ variables: { url } });

    return result.data?.ogMetadata;
  };

  return { loading, data, error, createOgMetadata };
}
