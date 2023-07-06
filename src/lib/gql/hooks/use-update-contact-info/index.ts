import { useMutation } from '@apollo/client';
import { GET_ACCOUNT_INFO, UPDATE_CONTACT_INFO } from '../../index';

interface UpdateContactInfoInput {
  contact: string;
  code: string;
  type: 'phone' | 'email';
}

export function useUpdateContactInfo() {
  const [updateContactInfo, { loading, error }] = useMutation<
    { updateContactInfo: { email?: string; phone?: string } },
    { payload: UpdateContactInfoInput }
  >(UPDATE_CONTACT_INFO);

  const onSubmit = async (data: UpdateContactInfoInput) => {
    try {
      await updateContactInfo({
        variables: {
          payload: data,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              accountInfo(current) {
                const accountInfo = data?.updateContactInfo;
                cache.writeQuery({
                  query: GET_ACCOUNT_INFO,
                  data: { ...current, ...accountInfo },
                });
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return { onSubmit, loading, error };
}
