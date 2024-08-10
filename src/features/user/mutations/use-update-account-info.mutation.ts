import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../shared';
import { UPDATE_ACCOUNT_INFO } from './index';
import { IAccountInfo } from '../shared';

export function useUpdateAccountInfoMutation() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { updateAccountInfo: IAccountInfo },
    { payload: Partial<IAccountInfo> }
  >(UPDATE_ACCOUNT_INFO);

  const update = async (formData: Partial<IAccountInfo>) => {
    try {
      return await mutate({
        variables: { payload: formData },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              accountInfo(current = {}) {
                if (!data || (data && !data.updateAccountInfo))
                  return current;

                try {
                  return cache.writeFragment({
                    id: current.__ref,
                    fragment: gql`
                      fragment AccountInfoFragment on AccountInfoModel {
                        username
                        birthday
                        country
                      }
                    `,
                    data: data.updateAccountInfo,
                  });
                } catch (e) {
                  if (import.meta.env.VITE_ENVIRONMENT === 'development') {
                    console.error('Caching Error: ', e);
                  }
                }
                return current;
              },
              me(current) {
                if (!data || (data && !data.updateAccountInfo))
                  return current;

                try {
                  return cache.writeFragment({
                    id: current.__ref,
                    fragment: gql`
                      fragment NewMeModel on MeModel {
                        username
                      }
                    `,
                    data: data.updateAccountInfo,
                  });
                } catch (e) {
                  if (import.meta.env.VITE_ENVIRONMENT === 'development') {
                    console.error('Caching Error: ', e);
                  }
                }
                return current;
              },
            },
          });
        },
      });
    } catch (e) {
      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { update, ...results };
}
