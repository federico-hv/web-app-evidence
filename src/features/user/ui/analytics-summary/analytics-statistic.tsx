import { Icon, VStack, HStack, Box, Text, Tooltip } from '@holdr-ui/react';
import { AnalyticsStatisticProps } from './types';

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
          <HStack
            items='center'
            justify='space-between'
            minWidth={65}
            gap={3}
          >
            {percent >= 0 ? upArrow : downArrow}
            <Box fontSize={4}>{Math.abs(percent)}%</Box>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
}

export default AnalyticsStatistic;
