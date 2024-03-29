import { VStack, Text, HStack } from '@holdr-ui/react';
import { ValueStatisticProps } from './types';

function ValueStatistic({
  label,
  value,
  prefix = '$',
  leftAddon,
}: ValueStatisticProps) {
  return (
    <VStack items='flex-start' justify='space-between' gap={'0.15rem'}>
      <Text casing='capitalize' color='base300' size={2} weight={400}>
        {label}
      </Text>
      <HStack gap={1} items='center'>
        {leftAddon && leftAddon}
        <Text size={4} weight={400}>
          {prefix}
          {value}
        </Text>
      </HStack>
    </VStack>
  );
}

export default ValueStatistic;
