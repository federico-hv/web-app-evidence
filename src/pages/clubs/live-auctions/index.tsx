import { Grid } from '@holdr-ui/react';
import { arrayFrom, useToast } from '../../../shared';
import { dummyAuctionMembershipData, dummyPerks } from '../shared';
import { AuctionCard } from '../../../features';
import { useCallback, useEffect, useState } from 'react';

const auctions = arrayFrom(10).map(() => {
  const auctionPlusId = {
    ...dummyAuctionMembershipData,
    id: Math.random().toString(36).slice(2, 11) + Date.now().toString(36),
    type: 'auction',
  };
  return auctionPlusId;
});

function LiveAuctionsClubPage() {
  return (
    <Grid gap={2} templateColumns='repeat(3, 1fr)'>
      {auctions.map((data, idx) => (
        <Grid.Item key={`live-auction-${idx}`} h='100%'>
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
        </Grid.Item>
      ))}
    </Grid>
  );
}

LiveAuctionsClubPage.displayName = 'LiveAuctionsClubPage';

export default LiveAuctionsClubPage;
