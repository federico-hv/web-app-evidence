import { Box, Heading, VStack } from '@holdr-ui/react';
import { formatMoney, RadialSurface } from '../../../../../shared';
import ValueStatistic from '../membership-value-summary/value-statistic';
import { useClubOverviewSuspenseQuery } from '../../../../stats';

function ClubOverview() {
  const { data } = useClubOverviewSuspenseQuery();

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
            description='The average price of your memberships based on sale history'
            value={formatMoney(data.clubOverview.averagePrice.value)}
          />
          <ValueStatistic
            label='Last membership sale'
            description='The most recent cost that a fan spent to purchase a Membership to your Club'
            value={formatMoney(data.clubOverview.lastSale.value)}
          />
          <ValueStatistic
            label='Memberships sold'
            description='The total amount of Memberships sold / Memberships remaining'
            prefix=''
            value={`${data.clubOverview.membershipCount.numerator}/${data.clubOverview.membershipCount.denominator}`}
          />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
ClubOverview.displayName = 'ClubOverview';

export default ClubOverview;
