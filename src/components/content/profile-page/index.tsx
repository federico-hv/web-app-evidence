import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FollowButton, FriendButton } from '../../buttons';
import darkPlaceholder from '../../../assets/images/dark-placeholder.jpg';
import { EditProfileDialog } from '../../dialogs';
import { ProfileContentProps } from './profile-page.types';
import { ReactNode } from 'react';

function ProfilePageHeader({ profile }: ProfileContentProps) {
  return (
    <HStack w='100%' justify='space-between'>
      <VStack>
        <Text size={4} weight={500}>
          {profile.displayName}
        </Text>
        <Text color='base400' weight={500} size={2}>
          0 Posts
        </Text>
      </VStack>
      <Box>
        {profile.accountType === 'ARTIST' && <FollowButton />}
        {profile.accountType === 'FAN' && <FriendButton />}
      </Box>
    </HStack>
  );
}

function BannerLg({ profile, currentUser }: ProfileContentProps) {
  return (
    <Box
      h={150}
      w='full'
      mt={1}
      position='relative'
      css={{ '@bp1': { display: 'none' }, '@bp3': { display: 'block' } }}
    >
      <Box zIndex={1} position='absolute' t={0} l={0} w='100%'>
        <Image
          src={profile.coverImage}
          w='100%'
          h={150}
          fallback={<Box h='100%' w='100%' bgColor='base100' />}
        />
      </Box>

      <Box
        h='100%'
        position='relative'
        zIndex={5}
        bgColor='darkTint400'
        px={6}
      >
        <HStack h='100%'>
          <Center w='100%'>
            <HStack w='100%' justify='space-between'>
              <HStack gap={4}>
                <Image
                  src={profile.avatar}
                  size={100}
                  radius={4}
                  fallbackSrc={darkPlaceholder}
                />
                <VStack py={2} justify='space-between'>
                  <VStack gap={1}>
                    <Text css={{ color: '#FFFFFF' }} size={5} weight={500}>
                      {profile.displayName}
                    </Text>
                    <Text color='base200' weight={500}>
                      @{profile.username}
                    </Text>
                  </VStack>
                </VStack>
              </HStack>
              {currentUser && (
                <Box py={2}>
                  {profile.accountType === 'ARTIST' && (
                    <HStack gap={3}>
                      <FollowButton />
                      <IconButton
                        variant='ghost'
                        colorTheme='primary400'
                        icon='more-fill'
                        ariaLabel='view more artist profile options'
                      />
                    </HStack>
                  )}
                  {profile.accountType === 'FAN' && <FriendButton />}
                  {profile.accountType === 'PERSONAL' && (
                    <EditProfileDialog />
                  )}
                </Box>
              )}
            </HStack>
          </Center>
        </HStack>
      </Box>
    </Box>
  );
}

function BannerSm({ profile, currentUser }: ProfileContentProps) {
  return (
    <Box css={{ '@bp3': { display: 'none' } }}>
      <Box t={0} position='absolute' w='100%'>
        <Image h={100} w='100%' src={darkPlaceholder} />
      </Box>
      <VStack
        position='absolute'
        w='100%'
        gap={6}
        t={0}
        bgColor='clearTint500'
        px={3}
        py={3}
      >
        <ButtonGroup
          colorTheme='primary400'
          justify='space-between'
          size='sm'
          boxShadow='none'
        >
          <IconButton icon='arrow-left-outline' ariaLabel='go back' />
          <IconButton
            icon='notification-outline'
            ariaLabel='notifications'
          />
        </ButtonGroup>
        <HStack gap={3} mb={0}>
          <Image
            src={profile.avatar}
            size={50}
            radius={4}
            fallbackSrc={darkPlaceholder}
          />
          <VStack flex={1} borderBottom={2} borderColor='base100'>
            <Text weight={500}>{profile.displayName}</Text>
            <Text size={2} color='base400'>
              @{profile.username}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack w='100%' position='absolute' t={100} pt={6}>
        {profile.bio && <Text size={2}>[Bio]</Text>}
        <HStack justify='space-between' items='center'>
          <HStack gap={3}>
            {profile.accountType === 'ARTIST' && (
              <Text size={2}>0 Followers</Text>
            )}
            {profile.accountType === 'FAN' && (
              <Text size={2}>0 Friends</Text>
            )}
            {profile.holdrs && <Text size={2}>[Holdrs]</Text>}
            {profile.memberships && <Text size={2}>[Memberships]</Text>}
          </HStack>
          {currentUser && (
            <>
              {profile.accountType === 'ARTIST' && (
                <Button size='sm' label='Follow' />
              )}
              {profile.accountType === 'FAN' && (
                <Button size='sm' label='Friend' />
              )}
              {profile.accountType === 'PERSONAL' && (
                <Button size='sm' label='Edit' />
              )}
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}

function ProfilePageBanner({ profile, currentUser }: ProfileContentProps) {
  return (
    <>
      <BannerLg profile={profile} currentUser={currentUser} />
      <BannerSm profile={profile} currentUser={currentUser} />
    </>
  );
}

function ProfilePageContent({ children }: { children?: ReactNode }) {
  return (
    <Box position='absolute' h='100%' t={{ '@bp3': 65 }} w='100%'>
      <Box position='relative' h='100%' overflow='hidden'>
        {children}
      </Box>
    </Box>
  );
}

ProfilePageHeader.displayName = 'ProfilePageHeader';
ProfilePageContent.displayName = 'ProfilePageContent';

export { ProfilePageHeader, ProfilePageContent, ProfilePageBanner };
