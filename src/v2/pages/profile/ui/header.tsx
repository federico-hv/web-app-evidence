import { Avatar, Box, HStack, Image } from '@holdr-ui/react';
import {
  SocialButton,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useCurrentUser,
  useProfile,
} from '../../../packages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lightPlaceholder from '../../../assets/images/light-placeholder.jpg';

function Header() {
  const { profile } = useProfile();
  const currentUser = useCurrentUser();

  return (
    <Box w='100%' h={200} bgColor='base100'>
      <Box
        role='banner'
        h={200}
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
          h={200}
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
            <HStack w='100%' justify='space-between' items='flex-start'>
              <TextGroup>
                <TextGroupHeading size={5} color='primary400'>
                  {profile.displayName}
                </TextGroupHeading>
                <TextGroupSubheading color='primary400'>
                  @{profile.username}
                </TextGroupSubheading>
              </TextGroup>
              {currentUser && <SocialButton />}
            </HStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
Header.displayName = 'Header';

export default Header;
