import { RadialSurface } from '../../../../shared';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  Tooltip,
  VStack,
} from '@holdr-ui/react';

function AnalyticsStatistics({
  label,
  value,
  percent,
  info,
}: {
  label: string;
  value: number;
  percent: number;
  info?: string;
}) {
  return (
    <VStack py={4}>
      <HStack items='center' gap={2}>
        <Text casing='capitalize' color='base300' size='14px'>
          {label}
        </Text>
        {info && (
          <Tooltip label={info}>
            <Box fontSize='12px'>
              <Icon name='information-outline' />
            </Box>
          </Tooltip>
        )}
      </HStack>
      <HStack items='flex-end' justify='space-between'>
        <Box fontSize='2rem'>{value}</Box>
        <HStack>
          <Box>{percent}%</Box>
        </HStack>
      </HStack>
    </VStack>
  );
}

function AnalyticsSummary() {
  return (
    <RadialSurface radius={4} h={450} w='100%' css={{ flexShrink: 0 }}>
      <VStack as='nav' p={4}>
        <Heading size={3} weight={400} css={{ userSelect: 'none' }}>
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
        <VStack>
          <AnalyticsStatistics
            label='profile views'
            value={0}
            percent={0}
          />
          <AnalyticsStatistics
            label='conversion rate'
            value={0}
            percent={0}
          />
          <AnalyticsStatistics
            label='total resales'
            value={0}
            percent={0}
          />
          <AnalyticsStatistics
            label='memberships sold'
            value={0}
            percent={0}
          />
          <AnalyticsStatistics
            label='outstanding memberships'
            value={0}
            percent={0}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
AnalyticsSummary.displayName = 'AnalyticsSummary';

export default AnalyticsSummary;
