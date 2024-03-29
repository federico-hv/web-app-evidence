import { RadialSurface, StringNumeric } from '../../../../shared';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from '@holdr-ui/react';
import { AnalyticsStatisticProps, AnalyticsSummaryProps } from './types';

function AnalyticsStatistic({
  label,
  value,
  percent,
  description,
  suffix,
}: AnalyticsStatisticProps) {
  const upArrow = (
    <Icon name='arrow-up-outline' color='success500' size='xl' />
  );
  const downArrow = (
    <Icon name='arrow-down-outline' color='danger400' size='xl' />
  );

  return (
    <VStack
      py={1}
      gap={'0.15rem' as any}
      mt={1}
      css={{ userSelect: 'none' }}
    >
      <HStack items='center' gap={2}>
        <Box>
          <Text casing='capitalize' color='base300' size='14px'>
            {label}
          </Text>
        </Box>
        {description && (
          <Box mt='1px'>
            <Tooltip color='white50' label={description}>
              <Box fontSize='12px'>
                <Icon color='base400' name='information-outline' />
              </Box>
            </Tooltip>
          </Box>
        )}
      </HStack>
      <HStack items='flex-end' justify='space-between'>
        <Box fontSize={4}>
          {value}
          {suffix && suffix}
        </Box>
        {percent !== undefined && (
          <HStack items='center' justify='space-between' minWidth={65} gap={3}>
            {percent >= 0 ? upArrow : downArrow}
            <Box fontSize={4}>{Math.abs(percent)}%</Box>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
}

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
