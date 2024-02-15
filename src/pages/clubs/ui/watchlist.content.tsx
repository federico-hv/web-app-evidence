import { VStack } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  OnSaleMembershipModel,
} from '../../../features';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Fragment } from 'react';

function WatchlistContent() {
  return (
    <VStack minHeight={0} w='100%' as='aside' gap={4}>
      <VStack gap={6}>
        <VStack mt={32}>
          <FlatList<OnSaleMembershipModel>
            gap={4}
            css={{ flexWrap: 'wrap' }}
            data={shuffle([
              ...arrayFrom(4).map(() => dummySecondarySaleMembershipData),
              ...arrayFrom(4).map(() => dummyAuctionMembershipData),
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
    </VStack>
  );
}
WatchlistContent.displayName = 'WatchlistContent';

export default WatchlistContent;
