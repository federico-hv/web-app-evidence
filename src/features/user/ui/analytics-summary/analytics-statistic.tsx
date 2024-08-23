import {
  Icon,
  VStack,
  HStack,
  Box,
  Text,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@holdr-ui/react';
import { AnalyticsStatisticProps } from './types';
import GainLossIndicator from '../../../../shared/components/gain-loss-indicator';
import { InformationTooltip } from '../../../../shared';

function AnalyticsStatistic({
  label,
  value,
  percent,
  description,
  suffix,
}: AnalyticsStatisticProps) {
  return (
    <VStack
      py={1}
      gap={'0.10rem' as any}
      mt={1}
      css={{ userSelect: 'none' }}
    >
      <HStack items='center' gap={2}>
        <Box>
          <Text casing='capitalize' color='base300' size={2}>
            {label}
          </Text>
        </Box>
        {description && (
          <InformationTooltip size='xs' description={description} />
        )}
      </HStack>
      <HStack items='flex-end' justify='space-between'>
        <Box fontSize={4}>
          {value}
          {suffix && suffix}
        </Box>
        {percent !== undefined && (
          <HStack
            items='center'
            justify='space-between'
            minWidth={65}
            gap={3}
          >
            {percent !== 0 && <GainLossIndicator isGain={percent > 0} />}
            <Box fontSize={4}>{Math.abs(percent)}%</Box>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
}

AnalyticsStatistic.displayName = 'Analytics Statistic';

export default AnalyticsStatistic;
