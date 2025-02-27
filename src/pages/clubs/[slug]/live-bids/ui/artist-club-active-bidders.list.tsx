import { StackDivider } from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  RadialSurface,
  TextGroup,
  TextGroupHeading,
} from '../../../../../shared';
import {
  ContenderFilterEnum,
  useGetAuctionSuspenseQuery,
  useGetContendersSuspenseQuery,
  useSuspenseGetClub,
  useCurrentUser,
  useRemainingMembershipCountSuspenseQuery,
} from '../../../../../features';
import { useParams } from 'react-router-dom';
import Bidder from './bidder';

function BidderList() {
  const currentUser = useCurrentUser();

  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data } = useGetContendersSuspenseQuery({
    id: auctionData.auction.id,
    filter: ContenderFilterEnum.Active,
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

function ArtistClubActiveBiddersList() {
  const { slug } = useParams();

  const { data: clubData } = useSuspenseGetClub({ slug });

  const { data: auctionData } = useGetAuctionSuspenseQuery(
    clubData.club.id,
  );

  const { data } = useRemainingMembershipCountSuspenseQuery(
    auctionData.auction.id,
  );

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
          {data.remainingMembershipsCount} memberships available
        </TextGroupHeading>
      </TextGroup>

      <BidderList />
    </RadialSurface>
  );
}

export default ArtistClubActiveBiddersList;
