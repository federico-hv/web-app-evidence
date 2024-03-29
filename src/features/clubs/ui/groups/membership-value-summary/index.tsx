import { RadialSurface } from '../../../../../shared';
import { Box, Heading, Icon, VStack } from '@holdr-ui/react';
import ValueStatistic from './value-statistic';
import { MembershipValueModel } from 'features/clubs/shared';

function MembershipValueSummary({
  averagePrice = 147,
  priceChange = 180,
  priceHasRisen = true,
  membershipsSold = 20,
  numOfMemberships = 250,
}: MembershipValueModel) {
  const gainArrow = (
    <Icon name='arrow-up-outline' color='success500' size='xl' />
  );
  const lossArrow = (
    <Icon name='arrow-down-outline' color='danger400' size='xl' />
  );

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
          <ValueStatistic
            label='Average price'
            value={averagePrice.toFixed(2)}
          />
          <ValueStatistic
            label='Gains/Losses'
            value={priceChange.toFixed(2)}
            leftAddon={priceHasRisen ? gainArrow : lossArrow}
          />
          <ValueStatistic
            label='Memberships sold'
            prefix=''
            value={`${membershipsSold}/${numOfMemberships}`}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
MembershipValueSummary.displayName = 'MembershipValueSummary';

export default MembershipValueSummary;
