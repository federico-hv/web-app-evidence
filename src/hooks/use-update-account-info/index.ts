import { useMutation } from '@apollo/client';
import { IAccountInfo } from 'shared';
import { GET_ACCOUNT_INFO, UPDATE_ACCOUNT_INFO } from 'lib';

export function useUpdateAccountInfo() {
  const [updateAccountInfo, { loading, error }] = useMutation<
    { updateAccountInfo: IAccountInfo },
    { payload: Partial<IAccountInfo> }
  >(UPDATE_ACCOUNT_INFO);

  const onSubmit = async (formData: Partial<IAccountInfo>) => {
    await updateAccountInfo({
      variables: { payload: formData },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            accountInfo(current) {
              const accountInfo = data?.updateAccountInfo;
              cache.writeQuery({
                query: GET_ACCOUNT_INFO,
                data: { ...current, accountInfo },
              });
            },
          },
        });
      },
    });
  };

  const onFinish = () => {
    if (error) {
      console.log('[UpdateAccountInfo]: ', error);
      throw new Error('Something went wrong. Please try again.');
    }
  };

  return { loading, error, onSubmit, onFinish };
}
