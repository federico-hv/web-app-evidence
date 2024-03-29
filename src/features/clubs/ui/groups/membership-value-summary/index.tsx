import { RadialSurface } from '../../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import ValueStatistic from './value-statistic';

function MembershipValueSummary() {
  return (
    <RadialSurface radius={4} h={171} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none' }}
        >
          Membership value
        </Heading>
        <Box
          mt={2}
          mb={3}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={2} justify='flex-end'>
          <ValueStatistic label='Average price' value={0} />
          <ValueStatistic label='Gains/Losses' value={0} />
          <ValueStatistic label='Last sale' value={0} />
          <ValueStatistic
            label='Memberships sold'
            prefix=''
            value='0/1000'
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MembershipValueSummary.displayName = 'MembershipValueSummary';

export default MembershipValueSummary;
