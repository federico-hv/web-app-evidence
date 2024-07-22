import { useMutation } from '@apollo/client';
import {
  CREATE_BID,
  UPDATE_BID,
} from '../../../../features/auction/mutations';
import { useToast } from '../../../../shared/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from 'pages/clubs/[slug]/ui/artist-club.tabs';

export interface BidData {
  bid: {
    id: number;
    amount: number;
    createdAt: Date;
  };
  user: {
    id: string;
    displayName: string;
    username: string;
  };
}

export interface Bid {
  id: string | number;
  amount: number;
}

export function useCreateBid() {
  const { onToggleAlert } = useOutletContext<OutletContext>();
  const { openWith } = useToast();
  const [bidCreated, setBidCreated] = useState(false);

  const [createBid, { data, loading, error }] = useMutation<BidData, Bid>(
    CREATE_BID,
    {
      onError: (error) => {
        if (
          error.message ===
          'You currently have a bid. You must either update or cancel your bid.'
        ) {
          alert('ALREADY CREATED BID');
          return setBidCreated(true);
        }

        alert(error.message);
      },
      onCompleted: (data) => {
        onToggleAlert(0);
        // alert('Bid created succesfully!');
        // setBidCreated(true);
      },
    },
  );

  const [
    updateBid,
    { data: updateBidData, loading: loadingBidData, error: updateError },
  ] = useMutation<BidData, Bid>(UPDATE_BID, {
    onError: (error) => {
      alert(error.message);
    },
    onCompleted: (data) => {
      onToggleAlert(2);
      //   setBidCreated(true);
    },
  });

  const onSubmit = async (bid: Bid, update: boolean = false) => {
    if (update) {
      await updateBid({
        variables: { ...bid },
      });
    } else {
      await createBid({
        variables: { ...bid },
      });
    }
  };

  return {
    bidCreated,
    data,
    loading,
    error,
    onSubmit,
    onFinish: null,
  };
}
