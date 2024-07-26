import { useMutation } from '@apollo/client';
import { DELETE_LIVE_AUCTION } from '../../../../features/auction/mutations';
import { useState } from 'react';
import { ErrorMessage, useToast } from '../../../../shared';

export interface IDeleteAuction {
  id: number;
  endsAt: Date;
  entryPrice: number;
}

interface DeleteAuctionVars {
  id: number;
}

export function useDeleteLiveAuction() {
  const { openWith } = useToast();

  const [mutation, { data, loading, error }] = useMutation<
    IDeleteAuction,
    DeleteAuctionVars
  >(DELETE_LIVE_AUCTION);

  const deleteLiveAuction = async (auctionId: number) => {
    try {
      return await mutation({
        variables: { id: auctionId },
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
    deleteLiveAuction,
    loading,
    error,
  };
}
