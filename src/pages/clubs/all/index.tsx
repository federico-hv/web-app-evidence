import { VStack } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { SectionTitle } from '../root/ui';
import { MembershipCard, OnSaleMembershipModel } from '../../../features';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
} from '../shared';

function AllClubsPage() {
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
          renderItem={(data) => (
            <MembershipCard
              data={{
                coverImage: data.coverImage,
                name: data.name,
                slug: data.artist.username,
                price: data.price,
                perks: dummyPerks,
                endDate: data.endDate,
              }}
            />
          )}
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
          renderItem={(data) => (
            <MembershipCard
              data={{
                coverImage: data.coverImage,
                name: data.name,
                slug: data.artist.username,
                price: data.price,
                perks: dummyPerks,
                endDate: data.endDate,
              }}
            />
          )}
          keyExtractor={(_, idx) => idx}
        />
      </VStack>
    </VStack>
  );
}
AllClubsPage.displayName = 'AllClubsPage';

export default AllClubsPage;
