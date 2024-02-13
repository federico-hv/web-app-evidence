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
import {
  Box,
  Circle,
  Heading,
  HStack,
  Icon,
  useSwitch,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { shuffle } from 'lodash';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Fragment, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Filter({
  label,
  active,
  name,
}: {
  label: string;
  name: string;
  active?: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = String(searchParams.get('filters')).split(',');

  const { switchState, toggle } = useSwitch(active);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HStack
      px={3}
      py={3}
      gap={3}
      onClick={() => {
        if (switchState) {
          setSearchParams((prev) => ({
            ...prev,
            filters: filters.filter((item) => item === name).join(','),
          }));
        } else {
          setSearchParams((prev) => ({
            ...prev,
            filters: [...filters, name].join(','),
          }));
        }
        toggle();
      }}
      items='center'
      radius={3}
      cursor='pointer'
      _hover={
        switchState
          ? { backgroundColor: 'rgba(152, 152, 255, 0.75)' }
          : { backgroundColor: 'rgba(152, 152, 255, 0.50)' }
      }
      css={{
        transition: 'all 0.25s ease',
        border: '1px solid rgba(152, 152, 255, 0.50)',
        backgroundColor: switchState ? 'rgba(152, 152, 255, 0.50)' : '',
      }}
      fontSize={2}
    >
      {switchState && (
        <Circle
          size='14px'
          bgColor='white500'
          // css={{ border: '1px solid rgba(152, 152, 255)' }}
        >
          <Icon color='purple400' name='check' />
        </Circle>
      )}
      {label}
    </HStack>
  );
}

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
