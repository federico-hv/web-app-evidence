import { HStack, Text } from '@holdr-ui/react';
import { ValueStatisticProps } from './types';

function ValueStatistic({
  label,
  value,
  prefix = '$',
}: ValueStatisticProps) {
  return (
    <HStack
      items='center'
      justify='space-between'
      css={{ fontSize: '14px' }}
    >
      <Text casing='capitalize' color='base300'>
        {label}
      </Text>
      <Text>
        {prefix}
        {value}
      </Text>
    </HStack>
  );
}

export default ValueStatistic;
