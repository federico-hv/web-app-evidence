import { useMutation } from '@apollo/client';
import { DELETE_PHONE_NUMBER } from '../../mutations';
import { GET_ACCOUNT_INFO } from '../../queries';

export function useDeletePhoneNumber() {
  const [deletePhoneNumber, { loading, error }] = useMutation(
    DELETE_PHONE_NUMBER,
  );

  const onSubmit = async () => {
    await deletePhoneNumber({
      update: (cache) => {
        cache.modify({
          fields: {
            accountInfo(current) {
              cache.writeQuery({
                query: GET_ACCOUNT_INFO,
                data: { ...current, phone: '' },
              });
            },
          },
        });
      },
    });
  };

  return { loading, error, onSubmit };
}
