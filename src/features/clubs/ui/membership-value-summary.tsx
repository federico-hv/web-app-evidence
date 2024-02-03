import { RadialSurface } from '../../../shared';
import { Box, Heading, HStack, Text, VStack } from '@holdr-ui/react';

export function ValueStatistic({
  label,
  value,
}: {
  value: number;
  label: string;
}) {
  return (
    <HStack
      items='center'
      justify='space-between'
      css={{ fontSize: '14px' }}
    >
      <Text casing='capitalize' color='base300'>
        {label}
      </Text>
      <Text>${value}</Text>
    </HStack>
  );
}

function MembershipValueSummary() {
  return (
    <RadialSurface radius={4} h={145} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={400}
          css={{ userSelect: 'none' }}
        >
          Membership value
        </Heading>
        <Box
          mt={{ '@bp1': '8px', '@bp3': '8px' }}
          mb={{ '@bp1': '16px', '@bp3': '16px' }}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={3}>
          <ValueStatistic label='Average price' value={0} />
          <ValueStatistic label='Entry price' value={0} />
          <ValueStatistic label='List price' value={0} />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MembershipValueSummary.displayName = 'MembershipValueSummary';

export default MembershipValueSummary;
