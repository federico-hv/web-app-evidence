import { HStack, Text } from '@holdr-ui/react';
import { StatisticProps } from './statistic.types';

function Statistic({ value, label }: StatisticProps) {
  return (
    <HStack fontSize={2} gap={1} as='p'>
      <Text weight={600} as='span'>
        {value}
      </Text>
      {label}
    </HStack>
  );
}
Statistic.displayName = 'Statistic';

export default Statistic;
