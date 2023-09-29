import { useGeneralContext } from '../../../shared';
import { IProfile } from '../shared';
import {
  Avatar,
  Box,
  Container,
  HStack,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import darkPlaceholder from '../../../assets/images/dark-placeholder.jpg';
import verifiedIcon from '../../../assets/images/verified-icon.png';

function Summary() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Box position='relative' h={{ '@bp1': 125, '@bp3': 175 }} w='100%'>
      <Image
        src={profile.coverImage}
        alt={`${profile.displayName} cover`}
        fallbackSrc={darkPlaceholder}
        css={{
          zIndex: 1,
        }}
      />

      <Box // overlay
        h='100%'
        w='100%'
        position='absolute'
        t={0}
        bgColor={profile.coverImage ? 'darkTint400' : 'transparent'}
        l={0}
        zIndex={5}
      />

      <Box
        p={{ '@bp1': 2, '@bp3': 4 }}
        h='100%'
        w='100%'
        position='absolute'
        t={0}
        l={0}
        zIndex={5}
      >
        <Container h='100%' maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
          <HStack
            gap={4}
            items='center'
            position='relative'
            h='100%'
            w='100%'
          >
            <Avatar
              variant='squircle'
              src={profile.avatar}
              name={profile.displayName}
              css={{
                '@bp1': {
                  size: 60,
                },
                '@bp3': { size: 90 },
              }}
            />
            <VStack gap={1}>
              {profile.role === 'artist' ? (
                <HStack gap={2} items='center'>
                  <Image
                    size={{ '@bp1': '0.65rem', '@bp3': '0.75rem' }}
                    src={verifiedIcon}
                  />
                  <Text
                    color='base100'
                    size={{ '@bp1': 1, '@bp3': 2 }}
                    weight={500}
                  >
                    Verified Artist
                  </Text>
                </HStack>
              ) : (
                <Text
                  color='base100'
                  size={{ '@bp1': 1, '@bp3': 2 }}
                  weight={500}
                >
                  @{profile.username}
                </Text>
              )}
              <Text
                color='primary400'
                size={{ '@bp1': 3, '@bp3': 7 }}
                weight={600}
              >
                {profile.displayName}
              </Text>
            </VStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
Summary.displayName = 'Summary';

export default Summary;
