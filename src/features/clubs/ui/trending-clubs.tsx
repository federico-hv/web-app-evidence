import {
  LinkOverlay,
  makePath,
  Paths,
  RadialSurface,
} from '../../../shared';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';

function TrendingClub({
  id,
  name,
  tags,
}: {
  id: string;
  name: string;
  tags?: string[];
}) {
  return (
    <HStack gap={3} position='relative'>
      <LinkOverlay to={makePath([Paths.clubs, id])} />
      <Avatar size='lg' variant='squircle' />
      <VStack mt={2} gap={2}>
        <Text casing='capitalize' size='14px' weight={500}>
          {name}
        </Text>
        {tags && (
          <HStack>
            {tags.map((tag) => (
              <Text noOfLines={1} key={tag} size='12px' color='info400'>
                #{tag}
              </Text>
            ))}
          </HStack>
        )}
      </VStack>
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
          weight={500}
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
