import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  OnSaleMembershipModel,
  useCurrentUser,
} from '../../../features';
import {
  arrayFrom,
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Heading, HStack, VStack } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { shuffle } from 'lodash';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from './ui';

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
              <FlatList<OnSaleMembershipModel>
                gap={4}
                css={{ flexWrap: 'wrap' }}
                data={shuffle([
                  ...arrayFrom(10).map(
                    () => dummySecondarySaleMembershipData,
                  ),
                  ...arrayFrom(10).map(() => dummyAuctionMembershipData),
                ])}
                renderItem={(data) => {
                  if (data.isLive) {
                    return <MembershipAuctionCard data={data} />;
                  } else if (!data.isLive) {
                    return <MembershipSecondarySaleCard data={data} />;
                  }
                  return <Fragment />;
                }}
                keyExtractor={(_, idx) => idx}
              />
            </VStack>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsAllPage.displayName = 'ClubsAllPage';

export default ClubsAllPage;
