import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Grid, Text } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import { ClubCard } from '../../../features';
import { useEffect } from 'react';

function generateRandomNumber(min = 800, max = 80000000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clubs = arrayFrom(10).map((ind) => {
  const auctionPlusId = {
    ...dummyAuctionMembershipData,
    id: Math.random().toString(36).slice(2, 11) + Date.now().toString(36),
    type: 'club',
    coverImage:
      'https://images.unsplash.com/photo-1575285113814-f770cb8c796e',
    name: `ArtistClub ${ind}`,
    followers: generateRandomNumber(),
    following: generateRandomNumber(10, 1000),
    endDate: null,
  };
  return auctionPlusId;
});

function ClubsPage() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {clubs.map((data, idx) => (
        <Grid.Item key={`watchlist-item-${idx}`} h='100%'>
          <ClubCard
            data={{
              coverImage: data.coverImage,
              name: data.name,
              followers: data.followers,
              following: data.following,
            }}
            onWatchClick={() => {}}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
}
ClubsPage.displayName = 'ClubsPage';

export default ClubsPage;
