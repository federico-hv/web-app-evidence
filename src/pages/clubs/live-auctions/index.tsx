import { Grid } from '@holdr-ui/react';
import { useAddToWatchList } from '../shared';
import { AuctionCard } from '../../../features';
import { useLiveAuctions } from '../shared/hooks/use-live-auctions';
import { AuctionCardData } from '../../../features/clubs/ui/card/auction.card';

function LiveAuctionsClubPage() {
  const { auctions, saveToWatchList } = useLiveAuctions();

  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {auctions.map((data: AuctionCardData, idx: number) => (
        <Grid.Item key={`live-auction-${idx}`} h='100%'>
          <AuctionCard
            data={{
              coverImage: data.coverImage,
              name: data.name,
              slug: data.slug,
              price: data.price,
              perks: data.perks,
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
