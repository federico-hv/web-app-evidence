import { Grid } from '@holdr-ui/react';
import { arrayFrom, useToast } from '../../../shared';
import { dummyAuctionMembershipData, dummyPerks } from '../shared';
import { AuctionCard } from '../../../features';
import { useCallback, useEffect, useState } from 'react';
import { useGetAllAuctions } from '../shared/hooks/use-get-all-auctions';

const hardCodedAuctions = arrayFrom(10).map(() => {
  const auctionPlusId = {
    ...dummyAuctionMembershipData,
    id: Math.random().toString(36).slice(2, 11) + Date.now().toString(36),
    type: 'auction',
    entryPrice: dummyAuctionMembershipData.price,
  };
  return auctionPlusId;
});

function LiveAuctionsClubPage() {
  const { data, loading, error } = useGetAllAuctions();
  const [auctions, setAuctions] = useState(hardCodedAuctions);

  useEffect(() => {
    if (data && data.auctions) {
      const newAuctions = data.auctions?.edges.map((item: any) => ({
        ...item.node,
        coverImage:
          item.node.club.coverImage === ''
            ? 'https://images.unsplash.com/photo-1575285113814-f770cb8c796e'
            : item.node.club.coverImage,
        type: 'auction',
      }));
      setAuctions(newAuctions);
    }
  }, [data]);

  const saveToWatchList = async (data: any) => {};

  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {auctions.map((data, idx) => (
        <Grid.Item key={`live-auction-${idx}`} h='100%'>
          <AuctionCard
            data={{
              coverImage: data.coverImage,
              name: data.name,
              slug: data.artist.username,
              price: data.entryPrice,
              perks: dummyPerks,
              endDate: data.endDate,
            }}
            onWatchClick={() => saveToWatchList(data)}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
}

LiveAuctionsClubPage.displayName = 'LiveAuctionsClubPage';

export default LiveAuctionsClubPage;
