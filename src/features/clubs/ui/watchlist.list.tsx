import { Box, Button, Heading, VStack, hexToRGB } from '@holdr-ui/react';
import { Paths, makeButtonLarger } from '../../../shared';
import { WatchlistItem } from './index';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../../../pages/clubs/shared';
import { matchPath, useLocation } from 'react-router-dom';

function Watchlist() {
  const { pathname } = useLocation();
  return (
    <VStack as='nav' p={4}>
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
      {/* <Button
        fullWidth
        className={makeButtonLarger('2.5rem')}
        colorTheme='purple500'
      >
        Browse Clubs
      </Button> */}
      <VStack gap={3} items={'center'}>
        <WatchlistItem
          active={
            !!matchPath(dummyAuctionMembershipData.name, pathname)
          }
          data={dummyAuctionMembershipData}
          to={dummyAuctionMembershipData.name}
        />
        <WatchlistItem
          active={!!matchPath(dummySecondarySaleMembershipData.name, pathname)}
          data={dummySecondarySaleMembershipData}
          to={dummySecondarySaleMembershipData.name}
        />

        <WatchlistItem
          active={!!matchPath('dummy3', pathname)}
          data={dummySecondarySaleMembershipData}
          to={'dummy3'}
        />
      </VStack>
    </VStack>
  );
}
Watchlist.displayName = 'Watchlist';

export default Watchlist;
