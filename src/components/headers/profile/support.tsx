import { useContext } from 'react';
import { Avatar, Box, HStack, Image, Text, VStack } from '@holdr-ui/react';
import { IProfile } from 'shared';

import { SocialButton } from '../../buttons';
import { ProfileOverlay } from '../../overlays';
import ProfileNameGroup from '../../groups/profile-name';
import { AuthContext } from '../../../contexts';
import { ProfileStatistics } from '../../groups';

import lightPlaceholder from 'assets/images/light-placeholder.jpg';

function ProfileHeaderSm({ profile }: { profile: IProfile }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Box css={{ '@bp4': { display: 'none' } }}>
      <Box
        role='banner'
        h={150}
        t={0}
        w='100%'
        bgColor='base300'
        position='relative'
      >
        <Box position='absolute' t={0} l={0} h='100%' w='100%'>
          <Box position='relative' t={0} h={150} w='100%'>
            <Image
              w='100%'
              h={150}
              src={profile.coverImage}
              fallbackSrc={lightPlaceholder}
            />

            <ProfileOverlay />

            <HStack
              position='absolute'
              w='100%'
              b={-16}
              zIndex={10}
              gap={4}
              px={3}
            >
              <Box flex={1}>
                <Avatar
                  src={profile.avatar}
                  variant='squircle'
                  name=''
                  css={{
                    height: 75,
                    width: 75,
                  }}
                />
              </Box>
              <ProfileNameGroup
                username={profile.username}
                displayName={profile.displayName}
              />
            </HStack>
          </Box>
        </Box>
      </Box>

      <VStack w='100%' mt={6} px={3}>
        {profile.bio && <Text size={2}>{profile.bio}</Text>}
        {/*{profile.url && <Text size={2}>[Url]</Text>}*/}
        <HStack
          mt={4}
          justify='space-between'
          items='center'
          color='base400'
        >
          <ProfileStatistics profile={profile} />
          {currentUser && <SocialButton />}
        </HStack>
      </VStack>
    </Box>
  );
}

function ProfileHeaderLg({ profile }: { profile: IProfile }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Box
      css={{ '@bp1': { display: 'none' }, '@bp4': { display: 'block' } }}
    >
      <Box
        role='banner'
        h={200}
        t={0}
        w='100%'
        bgColor='base300'
        position='relative'
      >
        <ProfileOverlay />
        <Image
          w='100%'
          h={200}
          src={profile.coverImage}
          fallbackSrc={lightPlaceholder}
        />
        <HStack
          position='absolute'
          items='center'
          t={0}
          b={0}
          zIndex={10}
          w='100%'
          px={3}
        >
          <HStack w='100%' gap={4}>
            <Box>
              <Avatar
                src={profile.avatar}
                variant='squircle'
                name=''
                css={{
                  height: 100,
                  width: 100,
                }}
              />
            </Box>
            <HStack w='100%' justify='space-between' items='flex-start'>
              <VStack gap={4}>
                <ProfileNameGroup
                  displayName={profile.displayName}
                  username={profile.username}
                />
              </VStack>
              {currentUser && <SocialButton />}
            </HStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

ProfileHeaderLg.displayName = 'ProfileHeaderLg';
ProfileHeaderSm.displayName = 'ProfileHeaderSm';

export { ProfileHeaderLg, ProfileHeaderSm };
