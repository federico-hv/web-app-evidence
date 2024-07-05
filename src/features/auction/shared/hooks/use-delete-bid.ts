import { useMutation } from '@apollo/client';
import { DELETE_BID } from '../../../../features/auction/mutations';
import { useToast } from '../../../../shared/hooks/use-toast';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from 'pages/clubs/[slug]/ui/artist-club.tabs';
import { BidData } from './use-create-bid';

// export interface Bid {
//   id: string;
//   amount: number;
// }

export function useDeleteBid() {
  const { onToggleAlert } = useOutletContext<OutletContext>();
  const { openWith } = useToast();
  const [bidDeleted, setBidDeleted] = useState(false);

  const [deleteBid, { data, loading, error }] = useMutation<
    BidData,
    { id: number }
  >(DELETE_BID, {
    onError: (error) => {
      alert(error.message);
    },
    onCompleted: (data) => {
      onToggleAlert(3);
    },
  });

  const onSubmit = async (bidID: number) => {
    await deleteBid({
      variables: { id: bidID },
    });
  };

  return {
    bidDeleted,
    data,
    loading,
    error,
    onSubmit,
    onFinish: null,
  };
}
