import { RadialSurface } from '../../../../../shared';
import { Box, Heading, Icon, VStack } from '@holdr-ui/react';
import ValueStatistic from './value-statistic';
import { dummyMembershipValueData } from '../../../shared/constants';

function MembershipValueSummary() {
  const gainArrow = (
    <Icon name='arrow-up-outline' color='success500' size='xl' />
  );
  const lossArrow = (
    <Icon name='arrow-down-outline' color='danger400' size='xl' />
  );

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
        <VStack gap={3} justify='flex-end'>
          <ValueStatistic
            label='Average price'
            value={
              dummyMembershipValueData.averagePrice === 0 ? 0 : dummyMembershipValueData.averagePrice.toFixed(2)
            }
          />
          <ValueStatistic
            label='Gains/Losses'
            value={
              dummyMembershipValueData.priceChange === 0 ? 0 : Math.abs(dummyMembershipValueData.priceChange).toFixed(2)
            }
            leftAddon={dummyMembershipValueData.priceChange >= 0 ? gainArrow : lossArrow}
          />
          <ValueStatistic
            label='Memberships sold'
            prefix=''
            value={`${dummyMembershipValueData.membershipsSold}/${dummyMembershipValueData.numOfMemberships}`}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MembershipValueSummary.displayName = 'MembershipValueSummary';

export default MembershipValueSummary;
