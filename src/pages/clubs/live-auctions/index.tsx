import { Grid } from '@holdr-ui/react';
import { arrayFrom } from '../../../shared';
import { dummyAuctionMembershipData, dummyPerks } from '../shared';
import { MembershipCard } from '../../../features';

function LiveAuctionsClubPage() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {arrayFrom(10)
        .map(() => dummyAuctionMembershipData)
        .map((data, idx) => (
          <Grid.Item key={`live-auction-${idx}`} h='100%'>
            <MembershipCard
              data={{
                coverImage: data.coverImage,
                name: data.name,
                slug: data.artist.username,
                price: data.price,
                perks: dummyPerks,
                endDate: data.endDate,
              }}
            />
          </Grid.Item>
        ))}
    </Grid>
  );
}
LiveAuctionsClubPage.displayName = 'LiveAuctionsClubPage';

export default LiveAuctionsClubPage;
