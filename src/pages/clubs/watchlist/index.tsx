import { Box, Grid, Text, VStack } from '@holdr-ui/react';
import { ClubCard, AuctionCard } from '../../../features';
import { AuctionCardData } from '../../../features/clubs/ui/card/auction.card';
import { ClubCardData } from '../../../features/clubs/ui/card/club.card';
import {
  useWatchlistItems,
  WatchlistItemData,
} from '../shared/hooks/use-watchlist-items';

function WatchlistPage() {
  const { items, removeFromWatchlist } = useWatchlistItems();

  if (items.length == 0) {
    return <VStack h={'100vh'}></VStack>;
  }

  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {items
        .filter((data) => (data as AuctionCardData).endDate != null)
        .concat(
          items.filter(
            (data) => (data as AuctionCardData).endDate == null,
          ),
        )
        .map((data: WatchlistItemData, idx: number) => {
          const isAuction = (data as AuctionCardData).endDate != null;
          return (
            <Grid.Item key={`watchlist-item-${idx}`} h='100%'>
              {isAuction ? (
                <AuctionCard
                  data={data as AuctionCardData}
                  onWatchClick={() => removeFromWatchlist(data)}
                  watchlist
                />
              ) : (
                <ClubCard
                  data={data as ClubCardData}
                  onWatchClick={() => removeFromWatchlist(data)}
                  watchlist
                />
              )}
            </Grid.Item>
          );
        })}
    </Grid>
  );
}
WatchlistPage.displayName = 'WatchlistPage';

export default WatchlistPage;
