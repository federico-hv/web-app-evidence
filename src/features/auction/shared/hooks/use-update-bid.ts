import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../../shared';
import { UPDATE_BID } from '../../mutations';
import { IAuctionBid, IUpdateBidArgs } from '../types';

export function useUpdateBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { updateBid: IAuctionBid },
    IUpdateBidArgs
  >(UPDATE_BID);

  const updateBid = async (data: IUpdateBidArgs) => {
    try {
      return await mutate({
        variables: data,
      });
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

  return {
    updateBid,
    ...results,
  };
}
