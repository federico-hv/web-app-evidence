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
  Paths,
  RadialSurface,
} from '../../../shared';
import { Box, Card, Heading, HStack, Icon, VStack } from '@holdr-ui/react';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { FlatList } from '../../../tmp/flat-list';
import { shuffle } from 'lodash';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function SectionTitle({ label, to }: { label: string; to?: string }) {
  const Content = () => (
    <HStack items='center' gap={2} css={{ userSelect: 'none' }}>
      <Heading as='h2' size={3} weight={400} casing='capitalize'>
        {label}
      </Heading>
      {to && <Icon size='lg' name='caret-right-outline' />}
    </HStack>
  );
  return (
    <Fragment>
      {to ? (
        <Link to={to}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </Fragment>
  );
}

function ClubsPage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Holdr - Clubs'
        title=''
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
            <VStack gap={6}>
              <VStack gap={4}>
                <SectionTitle
                  label='Your memberships'
                  to={Paths.club.memberships}
                />
                <FlatList<OnSaleMembershipModel>
                  overflow='auto'
                  className='hide-scrollbar'
                  gap={3}
                  data={shuffle([])}
                  renderItem={() => <Card />}
                  keyExtractor={(_, idx) => idx}
                />
              </VStack>
              <VStack gap={4}>
                <SectionTitle
                  label='Watchlist'
                  to={Paths.club.watchlist}
                />
                <FlatList<OnSaleMembershipModel>
                  overflow='auto'
                  className='hide-scrollbar'
                  gap={3}
                  data={shuffle([
                    ...arrayFrom(4).map(
                      () => dummySecondarySaleMembershipData,
                    ),
                    ...arrayFrom(4).map(() => dummyAuctionMembershipData),
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
              <VStack gap={4}>
                <SectionTitle
                  label='Following'
                  to={`${Paths.all}?filters=following`}
                />
                <FlatList<OnSaleMembershipModel>
                  overflow='auto'
                  className='hide-scrollbar'
                  gap={3}
                  data={shuffle([
                    ...arrayFrom(4).map(
                      () => dummySecondarySaleMembershipData,
                    ),
                    ...arrayFrom(4).map(() => dummyAuctionMembershipData),
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
              <VStack gap={4}>
                <SectionTitle
                  label='For you'
                  to={`${Paths.all}?filters=recommended`}
                />
                <FlatList<OnSaleMembershipModel>
                  overflow='auto'
                  className='hide-scrollbar'
                  gap={3}
                  data={shuffle([
                    ...arrayFrom(4).map(
                      () => dummySecondarySaleMembershipData,
                    ),
                    ...arrayFrom(4).map(() => dummyAuctionMembershipData),
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
              <VStack gap={4}>
                <SectionTitle label='Featured' to='all?filters=featured' />
                <FlatList<OnSaleMembershipModel>
                  overflow='auto'
                  className='hide-scrollbar'
                  gap={3}
                  data={shuffle([
                    ...arrayFrom(4).map(
                      () => dummySecondarySaleMembershipData,
                    ),
                    ...arrayFrom(4).map(() => dummyAuctionMembershipData),
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
            </VStack>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsPage.displayName = 'ClubsPage';
export default ClubsPage;
