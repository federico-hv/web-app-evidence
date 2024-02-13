import {
  changeDimensions,
  LinkOverlay,
  prefix,
  RadialSurface,
} from '../../../shared';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@holdr-ui/react';

function RecommendedArtist({
  username,
  displayName,
}: {
  username: string;
  displayName: string;
}) {
  return (
    <Box py={2}>
      <HStack px={4} py={3} justify='space-between'>
        <HStack
          gap={3}
          items='center'
          w='155px'
          overflow='hidden'
          position='relative'
        >
          <LinkOverlay to={prefix('/', username)} />
          <Avatar variant='squircle' css={{ size: '40px' }} />
          <VStack w='calc(100% - 40px)' overflow='hidden'>
            <Text casing='capitalize' size='14px' weight={500}>
              {displayName}
            </Text>
            <HStack color='base300' fontSize='14px' items='center'>
              <Icon name='at' css={{ ml: '$4' }} />
              <Text>{username}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Button
          className={changeDimensions({ height: '40px' })}
          colorTheme='white50'
          variant='outline'
        >
          Follow
        </Button>
      </HStack>
    </Box>
  );
}

function RecommendedArtists() {
  return (
    <RadialSurface radius={4} h={391} w='100%' css={{ flexShrink: 0 }}>
      <VStack py={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none', px: '$4' }}
        >
          Recommended artists
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
        <VStack>
          <RecommendedArtist
            username='usernameissuperlongaf'
            displayName='name'
          />
          <RecommendedArtist username='username' displayName='name' />
          <RecommendedArtist username='username' displayName='name' />
          <RecommendedArtist username='username' displayName='name' />
          <RecommendedArtist username='username' displayName='name' />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
RecommendedArtists.displayName = 'RecommendedArtists';

export default RecommendedArtists;
