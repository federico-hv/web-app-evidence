import { VStack } from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { SectionTitle } from '../root/ui';
import {
  AuctionCard,
  ClubCard,
  OnSaleMembershipModel,
  useCurrentUser,
} from '../../../features';
import { shuffle } from 'lodash';
import { Asset, arrayFrom } from '../../../shared';
import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
  useAddToWatchList,
} from '../shared';
import { useGetAllAuctions } from '../shared/hooks/use-get-all-auctions';
import { useEffect, useState } from 'react';
import {
  WatchlistItemData,
  useWatchlistItems,
} from '../shared/hooks/use-watchlist-items';
import { useLiveAuctions } from '../shared/hooks/use-live-auctions';
import { AuctionCardData } from '../../../features/clubs/ui/card/auction.card';
import { ClubCardData } from '../../../features/clubs/ui/card/club.card';

function AllClubsPage() {
  const { auctions, saveToWatchList } = useLiveAuctions();
  const { items, removeFromWatchlist } = useWatchlistItems();

  return (
    <VStack gap={7}>
      {auctions.length > 0 && (
        <VStack gap={4}>
          <SectionTitle label='Live Auctions' />
          <FlatList<AuctionCardData>
            overflow='auto'
            className='hide-scrollbar'
            gap={2}
            data={auctions}
            renderItem={(data) => (
              <AuctionCard
                data={{
                  coverImage: data.coverImage,
                  name: data.name,
                  slug: data.slug,
                  price: data.price,
                  perks: data.perks,
                  endDate: data.endDate,
                }}
                onWatchClick={() => saveToWatchList(data)}
              />
            )}
            keyExtractor={(_, idx) => idx}
          />
        </VStack>
      )}
      {items.length > 0 && (
        <VStack gap={4}>
          <SectionTitle label='Watchlist' />
          <FlatList<WatchlistItemData>
            overflow='auto'
            className='hide-scrollbar'
            gap={2}
            data={items}
            renderItem={(data) => {
              const isAuction = (data as AuctionCardData).endDate != null;
              return isAuction ? (
                <AuctionCard
                  data={data as AuctionCardData}
                  onWatchClick={() => removeFromWatchlist(data)}
                  watchlist
                />
              ) : (
                <ClubCard
                  data={data as ClubCardData}
                  onWatchClick={() => removeFromWatchlist(data)}
                  watchlist
                />
              );
            }}
            keyExtractor={(_, idx) => idx}
          />
        </VStack>
      )}
    </VStack>
  );
}
AllClubsPage.displayName = 'AllClubsPage';

export default AllClubsPage;
