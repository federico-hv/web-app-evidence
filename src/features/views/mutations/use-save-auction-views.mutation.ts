import { useMutation } from '@apollo/client';
import { ISuccessResponse } from '../../../shared';
import { SAVE_AUCTION_VIEWS } from './schema';

export interface ISaveAuctionViewsArgs {
  auctionIds: number[];
}

export interface ISaveAuctionViewsResponse {
  saveAuctionViews: ISuccessResponse;
}

export function useSaveAuctionViewsMutation() {
  const [mutate, results] = useMutation<
    ISaveAuctionViewsResponse,
    ISaveAuctionViewsArgs
  >(SAVE_AUCTION_VIEWS);

  const save = async (auctionIds: number[]) => {
    return await mutate({
      variables: {
        auctionIds,
      },
    });
  };

  return { save, ...results };
}
