import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../../shared';
import { CREATE_BID } from '../../mutations';
import { IAuctionBid, ICreateBidArgs } from '../types';
import {
  GET_BID,
  GET_BID_STATUS,
  GET_REMAINING_MEMBERSHIP_COUNT,
} from '../../queries';

export function useCreateBid() {
  const { openWith } = useToast();

  const [mutate, results] = useMutation<
    { createBid: IAuctionBid },
    ICreateBidArgs
  >(CREATE_BID);

  /**
   *
   * @param data
   *  - `id`: club ID
   *  - `amount`: bid amount
   * @param auctionId
   */
  const createBid = async (data: ICreateBidArgs, auctionId: number) => {
    try {
      return await mutate({
        variables: data,
        refetchQueries: [
          { query: GET_BID, variables: { auctionId: auctionId } },
          {
            query: GET_REMAINING_MEMBERSHIP_COUNT,
            variables: { auctionId: auctionId },
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
    createBid,
    ...results,
  };
}
