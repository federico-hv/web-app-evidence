import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../../shared';
import { UPDATE_BID } from '../../mutations';
import { IAuctionBid, IUpdateBidArgs } from '../types';
import {
  GET_BID,
  GET_BID_STATUS,
  GET_REMAINING_MEMBERSHIP_COUNT,
} from '../../queries';

export function useUpdateBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { updateBid: IAuctionBid },
    IUpdateBidArgs
  >(UPDATE_BID);

  const updateBid = async (data: IUpdateBidArgs, auctionId: number) => {
    try {
      return await mutate({
        variables: data,
        refetchQueries: [
          { query: GET_BID, variables: { auctionId: auctionId } },
          {
            query: GET_REMAINING_MEMBERSHIP_COUNT,
            variables: { auctionId: auctionId },
          },
          {
            query: GET_BID_STATUS,
            variables: { bidId: data.id },
          },
        ],
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              contenders(current = {}) {
                // need to add cache updates
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
    updateBid,
    ...results,
  };
}
