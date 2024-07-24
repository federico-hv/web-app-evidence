import { ErrorMessage, OgMetadata, useToast } from '../../../shared';
import { useMutation } from '@apollo/client';
import { CREATE_OG_METADATA } from './schema';

export function useCreateOgMetadataMutation() {
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { ogMetadata: OgMetadata },
    { url: string }
  >(CREATE_OG_METADATA);

  const createOgMetadata = async (url: string) => {
    try {
      return await mutation({ variables: { url } });
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { loading, error, createOgMetadata };
}
