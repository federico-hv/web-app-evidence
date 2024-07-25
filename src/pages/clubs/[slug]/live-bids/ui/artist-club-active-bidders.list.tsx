import { StackDivider, VStack, Text } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
} from '../../../../../shared';
import { useSuspenseGetActiveBidders } from '../../../../../features';
import Bidder from './bidder';
import { IBidder } from '..';

function ArtistClubActiveBiddersList({
  confirmWithdraw,
  currentUserId,
  bidders,
  numberOfMemberships,
  clubId,
}: {
  confirmWithdraw: (bidId: number) => void;
  currentUserId: string;
  clubId: string;
  numberOfMemberships: number;
  bidders: IBidder[];
}) {
  const isCurrentUser = (item: any) => item.id === currentUserId;

  const auctionWithBidders = bidders.length > 0;
  const membershipsLeft = numberOfMemberships - bidders.length;

  return (
    <RadialSurface
      radius={2}
      bgColor='#30304B'
      divider={
        <StackDivider color='rgba(152, 152, 255, 0.10)' width={1} />
      }
    >
      <TextGroup
        p={4}
        items='center'
        direction='horizontal'
        justify='space-between'
      >
        <TextGroupHeading as='h2' weight={400} size={5} color='white500'>
          Eligible
        </TextGroupHeading>
        <TextGroupHeading size={3} color='white700' as='h3'>
          {membershipsLeft} memberships available
        </TextGroupHeading>
      </TextGroup>

      {auctionWithBidders && (
        <FlatList
          py={4}
          data={bidders}
          keyExtractor={(item) => `inactive-bid-${item.id}`}
          renderItem={(item, idx) => (
            <Bidder
              confirmWithdraw={confirmWithdraw}
              isActive={isCurrentUser(item)}
              data={item}
              position={idx + 1}
            />
          )}
          direction='vertical'
        />
      )}
      {!auctionWithBidders && (
        <VStack items='center' py={'10px'}>
          <Text>No eligible bidders yet</Text>
        </VStack>
      )}
    </RadialSurface>
  );
}

export default ArtistClubActiveBiddersList;
