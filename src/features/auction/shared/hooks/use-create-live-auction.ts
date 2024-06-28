import { useMutation } from '@apollo/client';
import { CREATE_LIVE_AUCTION } from '../../../../features/auction/mutations';
import { useToast } from '../../../../shared/hooks/use-toast';
import { useEffect, useState } from 'react';

export interface LiveAuction {
  clubId: string;
  duration: number;
  entryPrice: number;
  numberOfMemberships: number;
}

export function useCreateLiveAuction() {
  const { openWith } = useToast();
  const [auctionCreated, setAuctionCreated] = useState(false);
  const [createLiveAuction, { data, loading, error }] = useMutation<any>(
    CREATE_LIVE_AUCTION,
    {
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        alert('Auction created succesfully!');
        setAuctionCreated(true);
      },
    },
  );

  const onSubmit = async (liveAuctionPayload: LiveAuction) => {
    await createLiveAuction({
      variables: { payload: liveAuctionPayload },
    });
  };

  return {
    auctionCreated,
    data,
    loading,
    error,
    onSubmit,
    onFinish: null,
  };
}
