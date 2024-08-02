import { StackDivider, VStack, Text } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
} from '../../../../../shared';
import {
  ContenderFilterEnum,
  useCurrentUser,
  useGetAuctionSuspenseQuery,
  useGetContendersSuspenseQuery,
  useSuspenseGetClub,
} from '../../../../../features';
import Bidder from './bidder';
import { useParams } from 'react-router-dom';

function BidderList() {
  const currentUser = useCurrentUser();

  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data } = useGetContendersSuspenseQuery({
    id: auctionData.auction.id,
    filter: ContenderFilterEnum.Inactive,
  });

  return (
    <FlatList
      py={4}
      data={data.contenders.edges}
      keyExtractor={({ cursor }) => `inactive-bid-${cursor}`}
      renderItem={({ node }, idx) => (
        <Bidder
          isHighlighted={node.owner.id === currentUser.id}
          data={node}
          position={idx + 1}
        />
      )}
      direction='vertical'
    />
  );
}

function ArtistClubInactiveBiddersList() {
  //const isCurrentUser = (item: any) => item.id === currentUserId;

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

      <BidderList />
    </RadialSurface>
  );
}

export default ArtistClubInactiveBiddersList;
