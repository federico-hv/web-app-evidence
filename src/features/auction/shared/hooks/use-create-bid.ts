import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../../shared';
import { CREATE_BID } from '../../mutations';
import { IAuctionBid, ICreateBidArgs } from '../types';

export function useCreateBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { createBid: IAuctionBid },
    ICreateBidArgs
  >(CREATE_BID);

  const createBid = async (data: ICreateBidArgs) => {
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
    createBid,
    ...results,
  };
}
