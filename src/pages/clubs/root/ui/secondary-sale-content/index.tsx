import { arrayFrom } from '../../../../../shared';
import { dummyAuctionMembershipData } from '../../../shared';
import { Grid } from '@holdr-ui/react';
import { MembershipSecondarySaleCard } from '../../../../../features';

function ClubsSecondarySaleContent() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {arrayFrom(10)
        .map(() => dummyAuctionMembershipData)
        .map((data, idx) => (
          <Grid.Item key={`live-auction-${idx}`}>
            <MembershipSecondarySaleCard data={data} />
          </Grid.Item>
        ))}
    </Grid>
  );
}
ClubsSecondarySaleContent.displayName = 'ClubsSecondarySaleContent';

export default ClubsSecondarySaleContent;
