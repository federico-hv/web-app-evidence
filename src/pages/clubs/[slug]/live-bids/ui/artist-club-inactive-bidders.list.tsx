import { StackDivider, VStack, Text } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
} from '../../../../../shared';
import { useSuspenseGetInactiveBidders } from '../../../../../features';
import Bidder from './bidder';
import { IBidder } from '..';

function ArtistClubInactiveBiddersList({
  confirmWithdraw,
  currentUserId,
  bidders,
  clubId,
}: {
  confirmWithdraw: (bidId: number) => void;
  currentUserId: string;
  clubId: string;
  bidders: IBidder[];
}) {
  const isCurrentUser = (item: any) => item.id === currentUserId;

  const auctionWithBidders = bidders.length > 0;

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
        <TextGroupHeading weight={400} size={5} color='white500'>
          Out of Contention
        </TextGroupHeading>
      </TextGroup>

      {auctionWithBidders && (
        <FlatList
          data={bidders}
          keyExtractor={(item) => `inactive-bid-${item.id}`}
          renderItem={(item, idx) => (
            <Bidder
              confirmWithdraw={confirmWithdraw}
              isActive={isCurrentUser(item)}
              position={idx + 1}
              data={item}
            />
          )}
          direction={'vertical'}
        />
      )}

      {!auctionWithBidders && (
        <VStack items='center' py={'10px'}>
          <Text>No out of contention bidders yet</Text>
        </VStack>
      )}
    </RadialSurface>
  );
}

export default ArtistClubInactiveBiddersList;
