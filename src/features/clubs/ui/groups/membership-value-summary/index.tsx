import { RadialSurface } from '../../../../../shared';
import { Box, Heading, Icon, VStack } from '@holdr-ui/react';
import ValueStatistic from './value-statistic';
import { MembershipValueProps } from './types';

function MembershipValueSummary({data}: MembershipValueProps) {
  const gainArrow = <Icon name='arrow-up-outline' color='success500' size='xl'/>;
  const lossArrow = <Icon name='arrow-down-outline' color='danger400' size='xl'/>;

  return (
    <RadialSurface radius={4} h='auto' w='100%' css={{ flexShrink: 0 }}>
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
          <ValueStatistic label='Average price' value={data.averagePrice} />
          <ValueStatistic
            label='Gains/Losses'
            value={data.priceChange}
            leftAddon={data.priceHasRisen? gainArrow : lossArrow}
          />
          <ValueStatistic
            label='Memberships sold'
            prefix=''
            value={`${data.membershipsSold}/${data.numOfMemberships}`}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MembershipValueSummary.displayName = 'MembershipValueSummary';

export default MembershipValueSummary;
