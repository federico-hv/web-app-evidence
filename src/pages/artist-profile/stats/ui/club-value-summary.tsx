import dayjs from 'dayjs';
import { Grid, GridItem, useGeneralContext } from '@holdr-ui/react';
import { IClubAnalyticsResponse } from '../../../../features';
import { ArtistProfileStatistic } from './index';
import { makePercentage, prefix } from '../../../../shared';
import millify from 'millify';

function ClubValueSummary() {
  const today = dayjs().format('YYYY-MM-D');

  const { state } = useGeneralContext<IClubAnalyticsResponse>();

  return (
    <Grid w='100%' gap={3} templateColumns='repeat(3 , 1fr)'>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The total amount of Memberships sold / Memberships remaining'
          label='Memberships sold'
          value={`${state.clubSummary.membershipCount.numerator}/${state.clubSummary.membershipCount.denominator}`}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The most recent cost that a fan spent to purchase a Membership to your Club'
          label='Last memberhsip sale'
          value={prefix('$', state.clubSummary.lastSale.value.toFixed(2))}
          percentage={makePercentage(
            state.clubSummary.lastSale.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average price of your memberships based on sale history'
          label='Avg. membership sale'
          value={prefix(
            '$',
            state.clubSummary.averagePrice.value.toFixed(2),
          )}
          percentage={makePercentage(
            state.clubSummary.averagePrice.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average number of participants in Live Auctions in a 3-month period.'
          label='average bidders'
          value={millify(state.clubSummary.averageBidders.value)}
          percentage={makePercentage(
            state.clubSummary.averageBidders.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The total number of times a specific web page has been visited by users within a 1-month timeframe.'
          label='club views'
          value={state.clubSummary.clubViews.value}
          percentage={makePercentage(
            state.clubSummary.clubViews.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average time when fans are most active based on pageviews and social interactions.'
          label='Peak engagement time'
          value={
            state.socialSummary.peakEngagementTime.length > 0
              ? dayjs(`${today}${state.socialSummary.peakEngagementTime}`)
                  .utc()
                  .local()
                  .format('h:mm A')
              : 'N/A'
          }
        />
      </GridItem>
    </Grid>
  );
}

export default ClubValueSummary;
