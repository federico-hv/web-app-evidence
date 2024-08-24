import { RadialSurface } from '../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import AnalyticsStatistic from './analytics-statistic';
import { dummyAnalyticsSummaryData } from '../../shared';
import { getFormattedTime } from '../../../../shared/utilities/time.utility';
import { useQuickAnalyticsSuspenseQuery } from '../../../stats/queries/use-quick-analytics.query';

function makePercentage(value: number) {
  return parseFloat((value * 100).toFixed(2));
}

function AnalyticsSummary() {
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
            description='A description'
            value={data.clubAnalytics.clubViews.value}
            percent={makePercentage(
              data.clubAnalytics.clubViews.percentage,
            )}
          />
          <AnalyticsStatistic
            label='average bidders'
            description='A description'
            value={data.clubAnalytics.averageBidders.value}
            percent={makePercentage(
              data.clubAnalytics.averageBidders.percentage,
            )}
          />
          <AnalyticsStatistic
            label='social interactions'
            description='A description'
            value={data.socialAnalytics.socialInteractions.value}
            percent={makePercentage(
              data.socialAnalytics.socialInteractions.percentage,
            )}
          />
          <AnalyticsStatistic
            label='peak engagement time'
            description='A description'
            value={data.socialAnalytics.peakEngagementTime}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
