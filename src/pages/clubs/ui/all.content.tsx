import { Box, Heading, VStack } from '@holdr-ui/react';
import { arrayFrom } from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';
import { Fragment } from 'react';
import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  OnSaleMembershipModel,
} from '../../../features';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { shuffle } from 'lodash';

function AllContent() {
  return (
    <VStack gap={6}>
      <VStack mt={32}>
        <Box>
          <Box mb='12px' css={{ userSelect: 'none' }}>
            <Heading as='h2' size={3} weight={400} casing='capitalize'>
              Live Auctions
            </Heading>
          </Box>
          <FlatList
            overflow='auto'
            className='hide-scrollbar'
            gap={5}
            data={arrayFrom(8).map(() => dummyAuctionMembershipData)}
            renderItem={(data) => <MembershipAuctionCard data={data} />}
            keyExtractor={(_, idx) => idx}
          />
        </Box>
      </VStack>
      <VStack>
        <Box>
          <Box mb='12px' css={{ userSelect: 'none' }}>
            <Heading as='h2' size={3} weight={400} casing='capitalize'>
              Secondary sales
            </Heading>
          </Box>
          <FlatList
            overflow='auto'
            className='hide-scrollbar'
            gap={5}
            data={arrayFrom(8).map(() => dummySecondarySaleMembershipData)}
            renderItem={(data) => (
              <MembershipSecondarySaleCard data={data} />
            )}
            keyExtractor={(_, idx) => idx}
          />
        </Box>
      </VStack>
      <VStack>
        <Box>
          <Box mb='12px' css={{ userSelect: 'none' }}>
            <Heading as='h2' size={3} weight={400} casing='capitalize'>
              Watchlist
            </Heading>
          </Box>
          <FlatList<OnSaleMembershipModel>
            overflow='auto'
            className='hide-scrollbar'
            gap={5}
            data={shuffle([
              ...arrayFrom(4).map(() => dummySecondarySaleMembershipData),
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
        </Box>
      </VStack>
    </VStack>
  );
}
AllContent.displayName = 'AllContent';

export default AllContent;
