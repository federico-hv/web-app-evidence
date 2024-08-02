import { Box, Button, Heading, VStack } from '@holdr-ui/react';
// import { dummyAuctionMembershipData } from '../../../../../pages/clubs/shared';
// import { dummySecondarySaleMembershipData } from '../../../../../pages/clubs/shared';
// import { WatchlistItem } from '../../groups';
import { Link } from 'react-router-dom';
import { makeButtonLarger, Paths, prefix } from '../../../../../shared';
import { useEffect, useState } from 'react';
import WatchlistItem from '../../groups/watchlist-item';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../../groups/watchlist-item/__tests__/dummyData';

const items: any = [];

function Watchlist() {
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
          items.slice(-3).map((el: any) => <WatchlistItem data={el} />)}
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
