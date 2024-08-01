import { useMutation } from '@apollo/client';
import { DELETE_BID } from '../../mutations';
import { ErrorMessage, useToast } from '../../../../shared';
import { IAuctionBid } from '../types';

export function useDeleteBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { deleteBid: IAuctionBid },
    { id: number }
  >(DELETE_BID);

  /**
   *
   * @param id the bid ID
   */
  const deleteBid = async (id: number) => {
    try {
      return await mutate({
        variables: {
          id,
        },
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
    deleteBid,
    ...results,
  };
}
