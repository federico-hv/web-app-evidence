import { StackDivider } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
} from '../../../../../shared';
import { useSuspenseGetActiveBidders } from '../../../../../features';
import Bidder from './bidder';

function ArtistClubActiveBiddersList({ clubId }: { clubId: string }) {
  const { data } = useSuspenseGetActiveBidders(clubId);

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
          {data.length} memberships available
        </TextGroupHeading>
      </TextGroup>

      <FlatList
        py={4}
        data={data}
        keyExtractor={(item) => `inactive-bid-${item.id}`}
        renderItem={(item, idx) => (
          <Bidder isActive data={item} position={idx + 1} />
        )}
        direction='vertical'
      />
    </RadialSurface>
  );
}

export default ArtistClubActiveBiddersList;
