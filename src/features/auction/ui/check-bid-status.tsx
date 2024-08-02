import { useParams } from 'react-router-dom';
import {
  AuctionEventNameEnum,
  useAuctionAlertContext,
} from '../../../pages/clubs/[slug]/shared/contexts';
import { useSuspenseGetClub } from '../../clubs';
import {
  AuctionBidStatusEnum,
  useBidStatusSuspenseQuery,
  useBidSuspenseQuery,
  useGetAuctionSuspenseQuery,
} from '../shared';
import { Fragment, useEffect } from 'react';

function lastArrayItem<T>(arr: T[]) {
  if (arr.length === 0) return null;
  return arr[arr.length - 1];
}

function CheckBidStatus() {
  const { slug } = useParams();

  const { update } = useAuctionAlertContext();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data: bidData } = useBidSuspenseQuery(auctionData.auction.id);

  const { data: bidStatusData } = useBidStatusSuspenseQuery(
    bidData && bidData.bid && bidData.bid.bid ? bidData.bid.bid.id : -1,
  );

  const isIneligible =
    bidStatusData.bidStatus &&
    bidStatusData.bidStatus === AuctionBidStatusEnum.Ineligible;

  useEffect(() => {
    if (isIneligible) {
      update({
        status: 'warning',
        eventName: AuctionEventNameEnum.outbid,
      });
    }
  }, [isIneligible]);

  return <Fragment />;
}

export default CheckBidStatus;
