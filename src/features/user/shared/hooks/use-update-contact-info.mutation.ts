import {
  ErrorMessage,
  IDataSuccessResponse,
  useToast,
} from '../../../../shared';
import { useMutation } from '@apollo/client';
import { UPDATE_CONTACT_INFORMATION } from '../../mutations';
import { ContactChannelEnum } from '../enums';
import { GET_ACCOUNT_INFO } from '../../queries';

interface UpdateContactInfoArgs {
  contact: string;
  code: string;
  channel: ContactChannelEnum;
}

interface IContactInfo {
  email?: string;
  phone?: string;
}

export function useUpdateContactInfoMutation() {
  const { openWith } = useToast();

  const [mutate, result] = useMutation<
    { updateContactInfo: IDataSuccessResponse<IContactInfo> },
    UpdateContactInfoArgs
  >(UPDATE_CONTACT_INFORMATION);

  const updateContactInfo = async (args: UpdateContactInfoArgs) => {
    try {
      return await mutate({
        variables: args,
        refetchQueries: [{ query: GET_ACCOUNT_INFO }],
        //🗒️ Caching not working
        // update: (cache, { data }) => {
        //   cache.modify({
        //     fields: {
        //       accountInfo(current = {}) {
        //         if (!data || (data && !data.updateContactInfo))
        //           return current;
        //
        //         try {
        //           return cache.writeFragment({
        //             id: current.__ref,
        //             fragment: gql`
        //               fragment AccountInfoFragment on AccountInfoModel {
        //                 phone
        //                 email
        //               }
        //             `,
        //             data: data.updateContactInfo.data,
        //           });
        //         } catch (e) {
        //           if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        //             console.error('Caching Error: ', e);
        //           }
        //         }
        //         return current;
        //       },
        //     },
        //   });
        // },
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

  return { updateContactInfo, ...result };
}
