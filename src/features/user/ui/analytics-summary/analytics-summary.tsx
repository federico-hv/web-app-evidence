import { RadialSurface } from '../../../../shared';
import {
  Box,
  Heading,
  VStack,
} from '@holdr-ui/react';
import { AnalyticsSummaryProps } from './types';
import AnalyticsStatistic from './analytics-statistic';

function AnalyticsSummary({ data }: AnalyticsSummaryProps) {

  const getPeakEngagementTime = (time: Date) => {
    return `${time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes()}`;
  }

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
            value={data.clubViews.value}
            percent={data.clubViews.changePercentage}
          />
          <AnalyticsStatistic
            label='resales'
            description='A description'
            value={data.totalResales.value}
            percent={data.totalResales.changePercentage}
          />
          <AnalyticsStatistic
            label='average bidders'
            description='A description'
            value={data.averageBidders.value}
            percent={data.averageBidders.changePercentage}
            suffix='%'
          />
          <AnalyticsStatistic
            label='social interactions'
            description='A description'
            value={data.socialInteractions.value}
            percent={data.socialInteractions.changePercentage}
            suffix='%'
          />
          <AnalyticsStatistic
            label='peak engagement time'
            description='A description'
            value={getPeakEngagementTime(data.peakEngagementTime)}
            suffix={data.peakEngagementTime.getHours() >= 12 ? ' p.m.' : ' a.m'}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
