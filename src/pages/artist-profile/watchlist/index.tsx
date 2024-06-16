import { Box, Heading, HStack, Text, VStack } from '@holdr-ui/react';
import { RadialSurface2 } from '../../../shared';
import { ArtistWatchlistItem } from './ui';

function ArtistProfileWatchlistPage() {
  return (
    <RadialSurface2
      direction='vertical'
      w='100%'
      h='100%'
      p={4}
      radius={3}
    >
      <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
        <Heading size={5} weight={400}>
          Watchlist
        </Heading>
      </Box>
      <VStack h='full' radius={2}>
        <HStack py={4}>
          <Box flex={1}>
            <Text weight={500}>Club</Text>
          </Box>
          <Box basis='156px'>
            <Text weight={500}>Entry Price</Text>
          </Box>
          <Box basis='180px'>
            <Text weight={500}>Ends In</Text>
          </Box>
          <Box basis='108px'>
            <Text weight={500}>Status</Text>
          </Box>
          <Box basis='40px' />
        </HStack>
        <VStack h='calc(100%)' py={4} gap={5}>
          <ArtistWatchlistItem />
        </VStack>
      </VStack>
    </RadialSurface2>
  );
}

export default ArtistProfileWatchlistPage;
