import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  useCurrentUser,
} from '../../../features';
import {
  arrayFrom,
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Grid, Heading, HStack, VStack } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortMemberships } from '../ui';

function ClubsAllPage() {
  const currentUser = useCurrentUser();

  const [searchParams] = useSearchParams();

  const filters = String(searchParams.get('filters')).split(',');

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix=''
        title='All Clubs'
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} minHeight='calc(100vh - 96px)'>
          {/* New page layout*/}
          <Box px='16px' py='20px'>
            <Box py='13.5px' mb='20px'>
              <Heading weight={400} size='24px'>
                Holdr Clubs
              </Heading>
            </Box>
            <VStack gap={5}>
              <HStack justify='space-between'>
                <HStack gap={3}>
                  <Filter
                    active={filters.includes('following')}
                    name='following'
                    label='Following'
                  />
                  <Filter
                    active={filters.includes('recommended')}
                    name='recommended'
                    label='Recommended'
                  />
                  <Filter
                    active={filters.includes('live')}
                    name='live'
                    label='Live auction'
                  />
                  <Filter
                    name='sale'
                    active={filters.includes('sale')}
                    label='Secondary sale'
                  />
                </HStack>
                <SortMemberships />
              </HStack>
              <Box
                my={3}
                h='1px'
                css={{ backgroundColor: 'rgba(152, 152, 255, 0.10)' }}
              />
              <Grid gap={2} templateColumns='repeat(3, 1fr)'>
                {shuffle([
                  ...arrayFrom(filters.includes('sale') ? 10 : 0).map(
                    () => dummySecondarySaleMembershipData,
                  ),
                  ...arrayFrom(filters.includes('live') ? 10 : 0).map(
                    () => dummyAuctionMembershipData,
                  ),
                ]).map((data, idx) => (
                  <Grid.Item key={`all-clubs${filters.join('-')}${idx}`}>
                    {data.isLive ? (
                      <MembershipAuctionCard data={data} />
                    ) : (
                      <MembershipSecondarySaleCard data={data} />
                    )}
                  </Grid.Item>
                ))}
              </Grid>
            </VStack>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsAllPage.displayName = 'ClubsAllPage';

export default ClubsAllPage;
