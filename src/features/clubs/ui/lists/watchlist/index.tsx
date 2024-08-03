import { Box, Button, Heading, VStack } from '@holdr-ui/react';
// import { dummyAuctionMembershipData } from '../../../../../pages/clubs/shared';
// import { dummySecondarySaleMembershipData } from '../../../../../pages/clubs/shared';
// import { WatchlistItem } from '../../groups';
import { Link } from 'react-router-dom';
import {
  Asset,
  makeButtonLarger,
  Paths,
  prefix,
} from '../../../../../shared';
import { useEffect, useState } from 'react';
import WatchlistItem from '../../groups/watchlist-item';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../../groups/watchlist-item/__tests__/dummyData';
import {
  useGetWatchlist,
  WatchlistEdge,
} from '../../../../../pages/clubs/shared';
import { useCurrentUser } from '../../../../../features/auth/shared/use-current-user';

import {
  useGetAllClubs,
  Club,
  ClubsEdge,
} from '../../../../../pages/clubs/shared/hooks/use-get-all-clubs';
import { WatchlistItemData } from '../../../../../pages/clubs/shared/hooks/use-watchlist-items';

function Watchlist() {
  const currentUser = useCurrentUser();
  const { data: clubsData, loading, error } = useGetAllClubs();
  const { data } = useGetWatchlist(currentUser.id);
  const [items, setItems] = useState<WatchlistItemData[]>([]);

  useEffect(() => {
    if (data && data.watchlist && clubsData && clubsData.clubs) {
      try {
        const newItems: WatchlistItemData[] = data.watchlist?.edges.map(
          (item: WatchlistEdge) => {
            const name = item.node.artist.username;
            const coverImage =
              item.node.club?.coverImage === ''
                ? Asset.Image.DarkPlaceholder
                : item.node.club?.coverImage;

            if (item.node.auction != null) {
              return {
                id: item.node.id,
                coverImage,
                name,
                endDate: item.node.auction.endsAt,
                price: item.node.auction.entryPrice,
              };
            } else {
              let followerCount,
                followingCount = 0;
              let club: ClubsEdge = clubsData.clubs.edges.find(
                (edge) => edge.node.id === item.node.club?.id,
              )!;

              if (!club) {
                clubsData.clubs.edges.forEach((edge) => {
                  console.log('IDS: ', edge.node.id, item.node.club?.id);
                });
              } else {
                const { followers, following } = club.node;
                followerCount = followers;
                followingCount = following;
              }

              return {
                id: item.node.id,
                coverImage,
                name,
                followers: followerCount,
                following: followingCount,
              };
            }
          },
        );

        setItems(newItems);
      } catch (err) {
        console.log('ERROR ', err);
      }
    }
  }, [data, clubsData]);

  return (
    <VStack minHeight={292} p={4}>
      <Heading size={3} weight={500} css={{ userSelect: 'none' }}>
        Watchlist
      </Heading>
      <Box
        mt={{ '@bp1': '8px', '@bp3': '8px' }}
        mb={{ '@bp1': '16px', '@bp3': '16px' }}
        h='1px'
        w='100%'
        css={{
          backgroundColor: 'rgba(152, 152, 255, 0.10)',
        }}
      />
      <Link to={prefix('/', Paths.clubs)}>
        {items.length === 0 && (
          <Button
            fullWidth
            className={makeButtonLarger('2.5rem')}
            colorTheme='purple500'
          >
            Browse Holdr Clubs
          </Button>
        )}
        {items.length > 0 &&
          items
            .slice(-3)
            .map((el: WatchlistItemData, i) => (
              <WatchlistItem data={el} />
            ))}
      </Link>
      {/*<VStack gap={0} items='center'>*/}
      {/*<WatchlistItem data={dummyAuctionMembershipData} />*/}
      {/*<WatchlistItem data={dummySecondarySaleMembershipData} />*/}
      {/*<WatchlistItem data={dummySecondarySaleMembershipData} />*/}
      {/*</VStack>*/}
    </VStack>
  );
}
Watchlist.displayName = 'Watchlist';

export default Watchlist;
