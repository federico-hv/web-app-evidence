import { VStack, Text } from '@holdr-ui/react';
import { ValueStatisticProps } from './types';

function ValueStatistic({
  label,
  value,
  prefix = '$',
}: ValueStatisticProps) {
  return (
    <VStack
      items='flex-start'
      justify='space-between'
    >
      <Text casing='capitalize' color='base300' size={2} weight={400}>
        {label}
      </Text>
      <Text size={4} weight={400}>
        {prefix}
        {value}
      </Text>
    </VStack>
  );
}

export default ValueStatistic;
