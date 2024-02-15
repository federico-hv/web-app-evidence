import { RadialSurface } from '../../../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import TrendingClub from './trending-club';

function TrendingClubs() {
  return (
    <RadialSurface radius={4} h={391} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none' }}
        >
          Trending clubs
        </Heading>
        <Box
          mt={2}
          mb={3}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={4}>
          <TrendingClub id='name-1' name='Name 1' tags={['example']} />
          <TrendingClub id='name-2' name='Name 2' tags={['example']} />
          <TrendingClub id='name-3' name='Name 3' tags={['example']} />
          <TrendingClub id='name-4' name='Name 4' tags={['example']} />
          <TrendingClub id='name-5' name='Name 5' tags={['example']} />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
TrendingClubs.displayName = 'TrendingClubs';

export default TrendingClubs;
