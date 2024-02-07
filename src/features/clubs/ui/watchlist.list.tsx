import { Box, Button, Heading, VStack } from '@holdr-ui/react';
import { makeButtonLarger } from '../../../shared';
import { WatchlistItem } from './index';

function Watchlist() {
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
      <Button
        fullWidth
        className={makeButtonLarger('2.5rem')}
        colorTheme='purple500'
      >
        Browse Clubs
      </Button>
      <VStack gap={4}>
        <WatchlistItem
          auctionName="I'm live!"
          timeLeft={new Date()}
          price={100}
          live={true}
        />
        <WatchlistItem
          auctionName='Not live :P'
          timeLeft={new Date()}
          price={0}
          live={false}
        />
      </VStack>
    </VStack>
  );
}
Watchlist.displayName = 'Watchlist';

export default Watchlist;
