import {
  dummyAuctionMembershipData,
  dummyPerks,
  dummySecondarySaleMembershipData,
} from '../shared';
import { Box, Grid, Text, VStack } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import { arrayFrom } from '../../../shared';
import { ClubCard, AuctionCard } from '../../../features';
import { useEffect, useState } from 'react';

const items: any = [];

function WatchlistPage() {
  const removeFromWatchlist = async (data: any) => {};

  if (items.length == 0) {
    return <VStack h={'100vh'}></VStack>;
  }

  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {items.map((data: any, idx: number) => (
        <Grid.Item key={`watchlist-item-${idx}`} h='100%'>
          {data.type == 'club' && (
            <ClubCard
              data={{
                coverImage: data.coverImage,
                name: data.name,
                followers: data.followers,
                following: data.following,
              }}
              onWatchClick={() => removeFromWatchlist(data)}
            />
          )}
          {data.type == 'auction' && (
            <AuctionCard
              data={{
                coverImage: data.coverImage,
                name: data.name,
                slug: data.artist.username,
                price: data.price,
                perks: dummyPerks,
                endDate: data.endDate,
              }}
              onWatchClick={() => {}}
            />
          )}
        </Grid.Item>
      ))}
    </Grid>
  );
}
WatchlistPage.displayName = 'WatchlistPage';

export default WatchlistPage;
