import { useMutation } from '@apollo/client';
import { CREATE_CUSTOM_ACCOUNT_LINK } from '../../mutations';

interface IAccountLinkModel {
  created: number;
  expires_at: number;
  url: string;
}

export function useCreateCustomAccountLink() {
  const [mutate, { loading, error, data }] = useMutation<
    {
      createCustomAccountLink: IAccountLinkModel;
    },
    { refreshURL: string; returnURL: string }
  >(CREATE_CUSTOM_ACCOUNT_LINK);

  const createLink = async (refreshURL: string, returnURL: string) => {
    try {
      return await mutate({
        variables: {
          refreshURL,
          returnURL,
        },
      });
    } catch (error) {
      console.error(error);
      throw Error('Failed to create a link.');
    }
  };

  return { createLink, loading, error, data };
}
