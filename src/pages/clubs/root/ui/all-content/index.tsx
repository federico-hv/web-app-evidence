import { VStack } from '@holdr-ui/react';
import { SectionTitle } from '../index';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  OnSaleMembershipModel,
} from '../../../../../features';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../../../shared';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../../../shared';
import { Fragment } from 'react';

function ClubsAllContent() {
  return (
    <VStack gap={7}>
      <VStack gap={4}>
        <SectionTitle label='Live Auctions' />
        <FlatList<OnSaleMembershipModel>
          overflow='auto'
          className='hide-scrollbar'
          gap={2}
          data={shuffle(
            arrayFrom(6).map(() => dummyAuctionMembershipData),
          )}
          renderItem={(data) => <MembershipAuctionCard data={data} />}
          keyExtractor={(_, idx) => idx}
        />
      </VStack>
      <VStack gap={4}>
        <SectionTitle label='Watchlist' />
        <FlatList<OnSaleMembershipModel>
          overflow='auto'
          className='hide-scrollbar'
          gap={2}
          data={shuffle([
            ...arrayFrom(3).map(() => dummySecondarySaleMembershipData),
            ...arrayFrom(3).map(() => dummyAuctionMembershipData),
          ])}
          renderItem={(data) => {
            if (data.endDate) {
              return <MembershipAuctionCard data={data} />;
            } else if (!data.endDate) {
              return <MembershipSecondarySaleCard data={data} />;
            }
            return <Fragment />;
          }}
          keyExtractor={(_, idx) => idx}
        />
      </VStack>
    </VStack>
  );
}
ClubsAllContent.displayName = 'ClubsAllContent';

export default ClubsAllContent;
