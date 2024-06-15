import { Box, Card, HStack, StackDivider, VStack } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../../shared';
import { useSuspenseGetInactiveBidders } from '../../../../../features';
import Bidder from './bidder';

function ArtistClubInactiveBiddersList({ clubId }: { clubId: string }) {
  const { data } = useSuspenseGetInactiveBidders(clubId);

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

      <FlatList
        data={data}
        keyExtractor={(item) => `inactive-bid-${item.id}`}
        renderItem={(item, idx) => (
          <Bidder position={idx + 1} data={item} />
        )}
        direction={'vertical'}
      />
    </RadialSurface>
  );
}

export default ArtistClubInactiveBiddersList;
