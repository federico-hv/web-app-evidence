import {
  Asset,
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

function ArtistItem({
  username,
  displayName,
}: {
  username: string;
  displayName: string;
}) {
  return (
    <HStack p={2} justify='space-between'>
      <HStack
        gap={3}
        items='center'
        w='155px'
        overflow='hidden'
        position='relative'
      >
        <LinkOverlay to={prefix('/', username)} />
        <Avatar
          name={displayName}
          src={Asset.Image.DarkPlaceholder}
          variant='squircle'
          css={{ size: '40px' }}
        />
        <VStack w='calc(100% - 40px)' overflow='hidden'>
          <Text casing='capitalize' size={2} weight={500}>
            {displayName}
          </Text>
          <HStack color='base300' fontSize={2} items='center'>
            <Icon name='at' css={{ ml: '$4' }} />
            <Text>{username}</Text>
          </HStack>
        </VStack>
      </HStack>

      <Button colorTheme='purple100' css={{ px: '$5' }}>
        Follow
      </Button>
    </HStack>
  );
}

function PopularArtists() {
  return (
    <RadialSurface radius={4} w='100%' css={{ flexShrink: 0 }}>
      <VStack p={4}>
        <Heading
          casing='capitalize'
          size={3}
          weight={500}
          css={{ userSelect: 'none' }}
        >
          Popular artists
        </Heading>
        <Box
          mt={4}
          mb={2}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <VStack gap={2}>
          <ArtistItem
            username='usernameissuperlongaf'
            displayName='name'
          />
          <ArtistItem username='username' displayName='name' />
          <ArtistItem username='username' displayName='name' />
          <ArtistItem username='username' displayName='name' />
          <ArtistItem username='username' displayName='name' />
        </VStack>
      </VStack>
    </RadialSurface>
  );
}
PopularArtists.displayName = 'RecommendedArtists';

export default PopularArtists;
