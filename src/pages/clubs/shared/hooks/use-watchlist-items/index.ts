import {
  WatchlistData,
  WatchlistEdge,
  useGetWatchlist,
  useRemoveFromWatchlist,
} from '../../../shared';
import { Box, Grid, Text, VStack } from '@holdr-ui/react';
import { Asset, GQLClient } from '../../../../../shared';
import { useCurrentUser, IPerk } from '../../../../../features';
import { useEffect, useState } from 'react';
import { AuctionCardData } from '../../../../../features/clubs/ui/card/auction.card';
import { ClubCardData } from '../../../../../features/clubs/ui/card/club.card';
import {
  ClubsData,
  useGetAllClubs,
} from '../../../shared/hooks/use-get-all-clubs';
import { GET_CLUB_PERKS } from '../../../../../features/clubs/queries';

export type WatchlistItemData = (ClubCardData | AuctionCardData) & {
  id: number;
};

export function useWatchlistItems() {
  const currentUser = useCurrentUser();
  const { data: clubsData, loading, error } = useGetAllClubs();
  const { data, refetch } = useGetWatchlist(currentUser.id);
  const { removeItem } = useRemoveFromWatchlist(currentUser.id);
  const [items, setItems] = useState<WatchlistItemData[]>([]);

  useEffect(() => {
    if (data && data.watchlist && clubsData && clubsData.clubs) {
      const watchlistItems: WatchlistItemData[] =
        data?.watchlist?.edges.map((item: WatchlistEdge) => {
          const name = item.node.artist.username;
          const coverImage =
            item.node.club.coverImage === ''
              ? Asset.Image.DarkPlaceholder
              : item.node.club.coverImage;

          if (item.node.auction != null) {
            let perks;

            perks = (item as WatchlistEdge).node.club.perks.map(
              (perk: IPerk) => perk.label,
            );

            return {
              id: item.node.id,
              coverImage,
              name,
              endDate: item.node.auction.endsAt,
              price: item.node.auction.entryPrice,
              perks,
            };
          } else {
            const club = clubsData?.clubs.edges.find(
              (edge) => edge.node.id === item.node.club?.id,
            );
            const { followers, following } = club!.node;

            return {
              id: item.node.id,
              coverImage,
              name,
              followers,
              following,
            };
          }
        });

      setItems(watchlistItems);
    }
  }, [data, clubsData]);

  async function fetchClubPerks(clubId: string) {
    try {
      const { data } = await GQLClient.query({
        query: GET_CLUB_PERKS,
        variables: { id: clubId },
      });

      return data.clubPerks;
    } catch (error) {
      console.error('Error fetching club perks:', error);
      throw error;
    }
  }

  const removeFromWatchlist = async (data: WatchlistItemData) => {
    const id = data.id;
    await removeItem(id);
  };

  return {
    items,
    removeFromWatchlist,
  };
}
