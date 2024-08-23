import { RadialSurface } from '../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import AnalyticsStatistic from './analytics-statistic';
import { dummyAnalyticsSummaryData } from '../../shared';
import { getFormattedTime } from '../../../../shared/utilities/time.utility';

function AnalyticsSummary() {
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
            value={dummyAnalyticsSummaryData.clubViews.value}
            percent={dummyAnalyticsSummaryData.clubViews.changePercentage}
          />
          <AnalyticsStatistic
            label='average bidders'
            description='A description'
            value={dummyAnalyticsSummaryData.averageBidders.value}
            percent={
              dummyAnalyticsSummaryData.averageBidders.changePercentage
            }
          />
          <AnalyticsStatistic
            label='social interactions'
            description='A description'
            value={dummyAnalyticsSummaryData.socialInteractions.value}
            percent={
              dummyAnalyticsSummaryData.socialInteractions.changePercentage
            }
            suffix='%'
          />
          <AnalyticsStatistic
            label='peak engagement time'
            description='A description'
            value={getFormattedTime(
              dummyAnalyticsSummaryData.peakEngagementTime,
            )}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
