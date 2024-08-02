import { useMutation } from '@apollo/client';
import { DELETE_BID } from '../../mutations';
import { ErrorMessage, useToast } from '../../../../shared';
import { IAuctionBid } from '../types';
import { GET_BID, GET_REMAINING_MEMBERSHIP_COUNT } from '../../queries';

export function useDeleteBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { deleteBid: IAuctionBid },
    { id: number }
  >(DELETE_BID);

  /**
   *
   * @param bidId the bid ID
   * @param auctionId
   */
  const deleteBid = async (bidId: number, auctionId: number) => {
    try {
      return await mutate({
        variables: {
          id: bidId,
        },
        refetchQueries: [
          { query: GET_BID, variables: { auctionId } },
          {
            query: GET_REMAINING_MEMBERSHIP_COUNT,
            variables: { auctionId: auctionId },
          },
        ],
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              contenders(current = {}) {
                cache.evict({ id: current.__ref });

                return;
              },
            },
          });
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
