import { RadialSurface } from '../../../../shared';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';

function TrendingClub({
  position,
  name,
}: {
  position: number;
  name: string;
}) {
  return (
    <HStack gap={4}>
      <Box fontSize={5} mt={2} w='1rem'>
        {position}
      </Box>
      <HStack gap={3}>
        <Avatar size='lg' variant='squircle' />
        <VStack mt={2}>
          <Text casing='capitalize' size='14px' weight={500}>
            {name}
          </Text>
          <Text size='14px' color='base300'>
            Name
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}

function TrendingClubs() {
  return (
    <RadialSurface radius={4} h={391} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={400}
          css={{ userSelect: 'none' }}
        >
          Trending clubs
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
        <VStack gap={4}>
          <TrendingClub position={1} name='Name' />
          <TrendingClub position={2} name='Name' />
          <TrendingClub position={3} name='Name' />
          <TrendingClub position={4} name='Name' />
          <TrendingClub position={5} name='Name' />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
TrendingClubs.displayName = 'TrendingClubs';

export default TrendingClubs;
