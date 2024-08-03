import { useAddToWatchList } from '../../../shared';
import { IPerk, useCurrentUser } from '../../../../../features';
import { useCallback, useEffect, useState } from 'react';
import {
  AuctionEdge,
  AuctionsData,
  useGetAllAuctions,
} from '../../../shared/hooks/use-get-all-auctions';
import { AuctionCardData } from '../../../../../features/clubs/ui/card/auction.card';
import { GET_CLUB_PERKS } from '../../../../../features/clubs/queries';
import { Asset, GQLClient } from '../../../../../shared';

export function useLiveAuctions() {
  const currentUser = useCurrentUser();
  const { data, loading, error } = useGetAllAuctions();
  const { addItem } = useAddToWatchList(currentUser.id);
  const [auctions, setAuctions] = useState<AuctionCardData[]>([]);

  useEffect(() => {
    if (data && data.auctions) {
      const newAuctions = data.auctions?.edges.map((item: AuctionEdge) => {
        let perks;

        perks = item.node.club.perks.map((perk: IPerk) => perk.label);

        return {
          clubId: item.node.club.id,
          coverImage:
            item.node.club.coverImage === ''
              ? Asset.Image.LightPlaceholder
              : item.node.club.coverImage,
          endDate: new Date(item.node.endsAt),
          slug: item.node.artist.username,
          price: item.node.entryPrice,
          perks,
        };
      });

      setAuctions(newAuctions);
    }
  }, [data]);

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

  const saveToWatchList = async (data: AuctionCardData) => {
    const clubId = data.clubId!;
    await addItem(clubId);
  };

  return {
    auctions,
    saveToWatchList,
  };
}
