import { shuffle } from 'lodash';
import { arrayFrom } from '../../../../../shared';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../../../shared';
import { Grid } from '@holdr-ui/react';
import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
} from '../../../../../features';

function ClubsWatchlistContent() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {shuffle([
        ...arrayFrom(10).map(() => dummySecondarySaleMembershipData),
        ...arrayFrom(10).map(() => dummyAuctionMembershipData),
      ]).map((data, idx) => (
        <Grid.Item key={`watchlist-item-${idx}`}>
          {data.endDate ? (
            <MembershipAuctionCard data={data} />
          ) : (
            <MembershipSecondarySaleCard data={data} />
          )}
        </Grid.Item>
      ))}
    </Grid>
  );
}
ClubsWatchlistContent.displayName = 'ClubsWatchlistContent';

export default ClubsWatchlistContent;
