import { Box, Heading, VStack } from '@holdr-ui/react';
import { InformationTooltip, RadialSurface } from '../../../../../shared';
import ValueStatistic from '../membership-value-summary/value-statistic';
import { getFormattedPriceVal } from '../../../../../shared/utilities/price.utility';
import { dummyMembershipValueData } from '../../../shared/constants';

function ClubOverview() {
  return (
    <RadialSurface radius={4} h='auto' w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none' }}
        >
          Club Overview
        </Heading>
        <Box
          my={5}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={3} justify='flex-end'>
          <ValueStatistic
            label='Average price'
            description='A description'
            value={getFormattedPriceVal(
              dummyMembershipValueData.averagePrice,
            )}
          />
          <ValueStatistic
            label='Last membership sale'
            description='A description'
            value={getFormattedPriceVal(
              dummyMembershipValueData.averagePrice,
            )}
          />
          <ValueStatistic
            label='Memberships sold'
            description='A description'
            prefix=''
            value={`${dummyMembershipValueData.membershipsSold}/${dummyMembershipValueData.numOfMemberships}`}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
ClubOverview.displayName = 'ClubOverview';

export default ClubOverview;
