import { VStack, Text, HStack } from '@holdr-ui/react';
import { ValueStatisticProps } from './types';
import { InformationTooltip } from '../../../../../shared';

function ValueStatistic({
  label,
  value,
  prefix = '$',
  suffix = '',
  leftAddon,
  description,
}: ValueStatisticProps) {
  return (
    <VStack
      items='flex-start'
      justify='space-between'
      css={{ gap: '0.5rem' }}
    >
      <HStack items='center' gap={1}>
        <Text
          py='4px'
          casing='capitalize'
          color='base300'
          size={2}
          weight={400}
        >
          {label}
        </Text>
        {description && (
          <InformationTooltip
            sideOffset={4}
            size='xs'
            description={description}
          />
        )}
      </HStack>
      <HStack gap={1} items='center'>
        {leftAddon && leftAddon}
        <Text size={4} weight={400}>
          {prefix}
          {value}
          {suffix}
        </Text>
      </HStack>
    </VStack>
  );
}

ValueStatistic.displayName = 'Membership Value Statistic';

export default ValueStatistic;
