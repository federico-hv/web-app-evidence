import { useMutation } from '@apollo/client';
import { GET_ME } from '../../../auth/queries';
import { GET_ACCOUNT_INFO } from '../../queries';
import { IAccountInfo } from '../types';
import { UPDATE_ACCOUNT_INFO } from '../../mutations';

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
            me(current) {
              const username = data?.updateAccountInfo.username;
              cache.writeQuery({
                query: GET_ME,
                data: { ...current, username: username },
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
