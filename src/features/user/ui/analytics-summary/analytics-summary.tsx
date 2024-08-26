import { makePercentage, RadialSurface } from '../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import AnalyticsStatistic from './analytics-statistic';
import { useQuickAnalyticsSuspenseQuery } from '../../../stats';
import millify from 'millify';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function AnalyticsSummary() {
  const today = dayjs().format('YYYY-MM-D');

  const { data } = useQuickAnalyticsSuspenseQuery();

  return (
    <RadialSurface radius={4} h='auto' w='100%' css={{ flexShrink: 0 }}>
      <VStack
        as='nav'
        p={4}
        gap={5}
        divider={
          <Box
            h='1px'
            w='100%'
            css={{
              backgroundColor: 'rgba(152, 152, 255, 0.10)',
            }}
          />
        }
      >
        <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
          Analytics
        </Heading>

        <VStack gap={6}>
          <AnalyticsStatistic
            label='club views'
            description='The total number of times a specific web page has been visited by users within a 1-month timeframe.'
            value={millify(data.clubAnalytics.clubViews.value)}
            percent={makePercentage(
              data.clubAnalytics.clubViews.percentage,
            )}
          />
          <AnalyticsStatistic
            label='average bidders'
            description='The average number of participants in Live Auctions in a 3-month period.'
            value={millify(data.clubAnalytics.averageBidders.value)}
            percent={makePercentage(
              data.clubAnalytics.averageBidders.percentage,
            )}
          />
          <AnalyticsStatistic
            label='social interactions'
            description='Social interactions is a percentage of the total number of likes, bookmarks and comments within a 3-month period.'
            value={millify(data.socialAnalytics.socialInteractions.value)}
            percent={makePercentage(
              data.socialAnalytics.socialInteractions.percentage,
            )}
          />
          <AnalyticsStatistic
            label='peak engagement time'
            description='The average time when fans are most active based on page views and social interactions.'
            value={
              data.socialAnalytics.peakEngagementTime.length > 0
                ? dayjs(
                    `${today}${data.socialAnalytics.peakEngagementTime}`,
                  )
                    .utc()
                    .local()
                    .format('h:mm A')
                : 'N/A'
            }
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
