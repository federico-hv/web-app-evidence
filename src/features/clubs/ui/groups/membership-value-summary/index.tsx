import { RadialSurface } from '../../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import ValueStatistic from './value-statistic';
import { dummyMembershipValueData } from '../../../shared/constants';
import GainLossIndicator from '../../../../../shared/components/gain-loss-indicator';
import { getFormattedPriceVal } from '../../../../../shared/utilities/price.utility';

function MembershipValueSummary() {
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
            value={getFormattedPriceVal(
              dummyMembershipValueData.averagePrice,
            )}
          />
          <ValueStatistic
            label='Gains/Losses'
            value={getFormattedPriceVal(
              dummyMembershipValueData.priceChange,
            )}
            leftAddon={
              dummyMembershipValueData.priceChange !== 0 && (
                <GainLossIndicator
                  isGain={dummyMembershipValueData.priceChange > 0}
                />
              )
            }
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
