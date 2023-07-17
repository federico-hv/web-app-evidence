import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useProfile,
} from '../../../shared';
import { SocialButton, useCurrentUser } from '../../../features';

import verifiedIcon from '../../../assets/images/verified-icon.png';
import lightPlaceholder from '../../../assets/images/light-placeholder.jpg';
import { styled } from '../../../configs';

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
  const { profile } = useProfile();
  const currentUser = useCurrentUser();

  return (
    <VStack>
      <Box w='100%' h={175} bgColor='base100'>
        <Box
          role='banner'
          h={175}
          t={0}
          w='100%'
          bgColor='base300'
          position='relative'
        >
          <Box
            bgColor='darkTint400'
            position='absolute'
            t={{ '@bp1': 50, '@bp3': 0 }}
            b={0}
            l={0}
            zIndex={10}
            w='100%'
          />
          <Image
            src={profile.coverImage}
            w='100%'
            h={175}
            fallbackSrc={lightPlaceholder}
          />
          <HStack
            position='absolute'
            items='center'
            t={0}
            b={0}
            zIndex={10}
            w='100%'
            px={5}
          >
            <HStack w='100%' gap={4}>
              <Box>
                <Avatar
                  variant='squircle'
                  src={profile.avatar}
                  name={profile.displayName}
                  css={{
                    height: 100,
                    width: 100,
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
                    <TextGroupHeading weight={600} size={5}>
                      {profile.displayName}
                    </TextGroupHeading>
                    <TextGroupSubheading weight={500} color='base100'>
                      @{profile.username}
                    </TextGroupSubheading>
                  </TextGroup>
                </VStack>
              </HStack>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <HStack px={5} my={5} justify='space-between'>
        <VStack gap={3}>
          {profile.bio && (
            <Box borderTop={1} borderColor='primary400'>
              <Text>{profile.bio}</Text>
            </Box>
          )}
          <ArtistUrl />
        </VStack>
        {currentUser && <SocialButton />}
      </HStack>
    </VStack>
  );
}
Header.displayName = 'Header';

export default Header;
