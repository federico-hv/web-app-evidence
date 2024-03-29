import { VStack, Text } from '@holdr-ui/react';
import { ValueStatisticProps } from './types';

function ValueStatistic({
  label,
  value,
  prefix = '$',
}: ValueStatisticProps) {
  return (
    <VStack
      items='center'
      justify='space-between'
    >
      <Text casing='capitalize' color='base300' size={2}>
        {label}
      </Text>
      <Text size={4}>
        {prefix}
        {value}
      </Text>
    </VStack>
  );
}

export default ValueStatistic;
