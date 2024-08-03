import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
  useAddToWatchList,
} from '../shared';
import { Grid, Text } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import { Asset, arrayFrom } from '../../../shared';
import { ClubCard, IPerk, useCurrentUser } from '../../../features';
import { useEffect, useState } from 'react';
import {
  ClubsEdge,
  useGetAllClubs,
} from '../shared/hooks/use-get-all-clubs';
import { ClubCardData } from 'features/clubs/ui/card/club.card';

function ClubsPage() {
  const currentUser = useCurrentUser();
  const { data, loading, error } = useGetAllClubs();
  const { addItem } = useAddToWatchList(currentUser.id);
  const [clubs, setClubs] = useState<ClubCardData[]>([]);

  useEffect(() => {
    if (data && data.clubs) {
      try {
        const newClubs: ClubCardData[] = data.clubs?.edges.map(
          (item: ClubsEdge) => {
            let perks;

            perks = item.node.perks.map((perk: IPerk) => perk.label);

            return {
              clubId: item.node.id,
              name: item.node.name,
              following: item.node.following,
              followers: item.node.followers,
              coverImage:
                item.node.coverImage === ''
                  ? Asset.Image.DarkPlaceholder
                  : item.node.coverImage,
              perks,
            };
          },
        );
        setClubs(newClubs);
      } catch (err) {
        console.log('ERROR: ', err);
      }
    }
  }, [data]);

  const saveToWatchList = async (data: ClubCardData) => {
    const clubId = data.clubId;
    await addItem(clubId);
  };

  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {clubs.map((data: ClubCardData, idx: number) => (
        <Grid.Item key={`club-${idx}`} h='100%'>
          <ClubCard
            data={data}
            onWatchClick={() => saveToWatchList(data)}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
}
ClubsPage.displayName = 'ClubsPage';

export default ClubsPage;
