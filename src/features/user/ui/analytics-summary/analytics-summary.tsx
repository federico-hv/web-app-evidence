import { RadialSurface } from '../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import AnalyticsStatistic from './analytics-statistic';
import { dummyAnalyticsSummaryData } from '../../shared/constants';

function AnalyticsSummary() {
  const getPeakEngagementTime = (time: Date) => {
    return `${
      time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
    }:${
      time.getMinutes() > 10
        ? time.getMinutes()
        : time.getMinutes().toString().padStart(2, '0')
    }`;
  };

  return (
    <RadialSurface radius={4} h='auto' w='100%' css={{ flexShrink: 0 }}>
      <VStack as='nav' p={4}>
        <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
          Analytics
        </Heading>
        <Box
          mt={{ '@bp1': '8px', '@bp3': '8px' }}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={2} pt={2}>
          <AnalyticsStatistic
            label='club views'
            description='A description'
            value={dummyAnalyticsSummaryData.clubViews.value}
            percent={dummyAnalyticsSummaryData.clubViews.changePercentage}
          />
          <AnalyticsStatistic
            label='resales'
            description='A description'
            value={dummyAnalyticsSummaryData.totalResales.value}
            percent={
              dummyAnalyticsSummaryData.totalResales.changePercentage
            }
          />
          <AnalyticsStatistic
            label='average bidders'
            description='A description'
            value={dummyAnalyticsSummaryData.averageBidders.value}
            percent={
              dummyAnalyticsSummaryData.averageBidders.changePercentage
            }
            suffix='%'
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
            value={getPeakEngagementTime(
              dummyAnalyticsSummaryData.peakEngagementTime,
            )}
            suffix={
              dummyAnalyticsSummaryData.peakEngagementTime.getHours() >= 12
                ? ' p.m.'
                : ' a.m'
            }
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
