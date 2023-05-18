import {
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FollowButton, FriendButton } from '../../buttons';
import darkPlaceholder from '../../../assets/images/dark-placeholder.webp';
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

function ProfilePageBanner({ profile, currentUser }: ProfileContentProps) {
  return (
    <Box h={150} w='full' mt={1} position='relative'>
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

function ProfilePageContent({ children }: { children?: ReactNode }) {
  return (
    <Box position='absolute' t={65} w='100%'>
      <Box position='relative' h='100%' overflow='hidden'>
        {children}
      </Box>
    </Box>
  );
}

ProfilePageHeader.displayName = 'ProfilePageHeader';
ProfilePageContent.displayName = 'ProfilePageContent';

export { ProfilePageHeader, ProfilePageContent, ProfilePageBanner };
