import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  Responsive,
  ResponsiveItem,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useDimensions,
  useProfile,
} from '../../../shared';
import { SocialButton, useCurrentUser } from '../../../features';

import verifiedIcon from '../../../assets/images/verified-icon.png';
import lightPlaceholder from '../../../assets/images/light-placeholder.jpg';
import { styled } from '../../../configs';
import { RelationshipsCard } from './index';
import { useRef } from 'react';

const StyledAnchor = styled('a', {
  width: 'fit-content',
});

function ArtistUrl() {
  // TODO: Make a query to get the artist's url
  const { profile } = useProfile();

  return (
    <>
      {profile.username === 'seanphillips' && (
        <StyledAnchor target='_blank' href='https://www.google.com'>
          <HStack
            borderBottom={1}
            borderColor='base100'
            gap={2}
            items='center'
            cursor='pointer'
          >
            <Icon name='global-outline' color='base400' />
            <Text color='base400'>www.seanphillips.com</Text>
          </HStack>
        </StyledAnchor>
      )}
    </>
  );
}

function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);
  const { profile } = useProfile();
  const currentUser = useCurrentUser();

  return (
    <VStack innerRef={ref} borderBottom={2} borderColor='base100'>
      <Box
        w='100%'
        h={
          dimensions
            ? dimensions.width / 3.25
            : { '@bp1': 125, '@bp3': 175 }
        }
        bgColor='base100'
      >
        <Box
          role='banner'
          h={
            dimensions
              ? dimensions.width / 3.25
              : { '@bp1': 125, '@bp3': 175 }
          }
          t={0}
          w='100%'
          bgColor='base300'
          position='relative'
        >
          <Box
            bgColor='darkTint400'
            position='absolute'
            t={0}
            b={0}
            l={0}
            zIndex={10}
            w='100%'
          />
          <Image
            src={profile.coverImage}
            w='100%'
            h={
              dimensions
                ? dimensions.width / 3.25
                : { '@bp1': 125, '@bp3': 175 }
            }
            fallbackSrc={lightPlaceholder}
          />
          <HStack
            position='absolute'
            items='center'
            t={0}
            b={0}
            zIndex={10}
            w='100%'
            px={{ '@bp1': 3, '@bp4': 5 }}
          >
            <HStack w='100%' gap={{ '@bp1': 3, '@bp4': 4 }}>
              <Box>
                <Avatar
                  variant='squircle'
                  src={profile.avatar}
                  name={profile.displayName}
                  css={{
                    '@bp1': {
                      height: 70,
                      width: 70,
                    },
                    '@bp3': {
                      height: 100,
                      width: 100,
                    },
                  }}
                />
              </Box>
              <HStack
                py={3}
                w='100%'
                justify='space-between'
                items='flex-start'
              >
                <VStack gap={2}>
                  {profile.username === 'seanphillips' && (
                    <HStack gap={2}>
                      <Image src={verifiedIcon} size={16} />
                      <Text size={2} color='primary400'>
                        Verified Artist
                      </Text>
                    </HStack>
                  )}
                  <TextGroup gap={1} color='primary400'>
                    <TextGroupHeading
                      weight={600}
                      size={{ '@bp1': 4, '@bp3': 5 }}
                    >
                      {profile.displayName}
                    </TextGroupHeading>
                    <TextGroupSubheading
                      size={{ '@bp1': 2, '@bp3': 3 }}
                      weight={500}
                      color='base100'
                    >
                      @{profile.username}
                    </TextGroupSubheading>
                  </TextGroup>
                </VStack>
              </HStack>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <Stack
        direction={{ '@bp1': 'vertical', '@bp3': 'horizontal' }}
        px={{ '@bp1': 3, '@bp4': 5 }}
        gap={{ '@bp1': 4, '@bp4': 0 }}
        my={{ '@bp1': 3, '@bp3': 5 }}
        justify='space-between'
      >
        <VStack gap={3} minHeight={0}>
          {profile.bio && (
            <Box borderTop={1} borderColor='primary400'>
              <Text>{profile.bio}</Text>
            </Box>
          )}
          <ArtistUrl />
        </VStack>

        {currentUser && (
          <VStack gap={4}>
            <SocialButton />
            <Responsive>
              <ResponsiveItem mobile='show'>
                <RelationshipsCard />
              </ResponsiveItem>
            </Responsive>
          </VStack>
        )}
      </Stack>
    </VStack>
  );
}
Header.displayName = 'Header';

export default Header;
