import { RadialSurface } from '../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import { ValueStatistic } from './membership-value-summary';

function MonthlySalesSummary() {
  return (
    <RadialSurface radius={4} h={145} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none' }}
        >
          Monthly sales
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
          <ValueStatistic label='VIP tickets' value={0} />
          <ValueStatistic label='Merchandise' value={0} />
          <ValueStatistic label='Memberships' value={0} />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MonthlySalesSummary.displayName = 'MonthlySalesSummary';

export default MonthlySalesSummary;
