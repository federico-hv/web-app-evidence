import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Grid } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import { AuctionCard } from '../../../features';

function WatchlistClubPage() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {shuffle([
        ...arrayFrom(10).map(() => dummySecondarySaleMembershipData),
        ...arrayFrom(10).map(() => dummyAuctionMembershipData),
      ]).map((data, idx) => (
        <Grid.Item key={`watchlist-item-${idx}`} h='100%'>
          <AuctionCard
            data={{
              coverImage: data.coverImage,
              name: data.name,
              slug: data.artist.username,
              price: data.price,
              perks: dummyPerks,
            }}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
}
WatchlistClubPage.displayName = 'WatchlistClubPage';

export default WatchlistClubPage;
