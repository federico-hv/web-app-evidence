import { arrayFrom } from '../../../../../shared';
import { dummyAuctionMembershipData } from '../../../shared';
import { Grid } from '@holdr-ui/react';
import { MembershipAuctionCard } from '../../../../../features';

function ClubsLiveAuctionsContent() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {arrayFrom(10)
        .map(() => dummyAuctionMembershipData)
        .map((data, idx) => (
          <Grid.Item key={`live-auction-${idx}`}>
            <MembershipAuctionCard data={data} />
          </Grid.Item>
        ))}
    </Grid>
  );
}
ClubsLiveAuctionsContent.displayName = 'ClubsLiveAuctionsContent';

export default ClubsLiveAuctionsContent;
