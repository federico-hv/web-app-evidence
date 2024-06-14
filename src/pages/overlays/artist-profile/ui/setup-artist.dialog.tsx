import { Loader, makePath, Paths, voidFn } from '../../../../shared';
import {
  ClubProvider,
  useLazyIsArtistProfileComplete,
} from '../../../../features';
import {
  Alert,
  AlertContent,
  AlertDescription,
  Box,
  Center,
  CircularProgress,
  Dialog,
  GeneralContextProvider,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { SetupStep } from './index';

function SetupArtistDialog() {
  const height = {
    [Paths.setupArtist.uploadPhoto]: 785,
    [Paths.setupArtist.aboutMeAndPerks]: 695,
    [Paths.setupArtist.socialMediaAccounts]: 695,
    [Paths.setupArtist.customURL]: 500,
    [Paths.setupArtist.connectOnboarding]: 650,
  };

  const disclosure = useDisclosure(true);

  const location = useLocation();
  const navigate = useNavigate();

  // remove "" from '/' splitting
  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  const onClose = async () => {
    disclosure.onClose();
    navigate(location.state.previousLocation || '/');
  };

  return (
    <Dialog {...disclosure} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay zIndex={15} />
        <Dialog.Content
          zIndex={20}
          bgColor='#30304B'
          position='relative'
          w={{ '@bp1': '100%', '@bp3': '90vw' }}
          // maxWidth={loading || error ? 400 : 882}
          maxWidth={882}
          minHeight={{ '@bp1': '100%', '@bp3': '250px' }}
          h={{
            '@bp1': '1px',
            // '@bp3':
            //   loading || error ? '100px' : height[currentPath] || '500px',
            '@bp3': height[currentPath] || '500px',
          }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '95vh' }}
          radius={{ '@bp1': 0, '@bp3': 2 }}
          transitionProperty='all'
          transitionDuration='0.25s'
          transitionTimingFunction='easeInOut'
        >
          <Dialog.Body px={0} h='full' id='page-dialog-container'>
            <HStack
              h='full'
              divider={
                <Box
                  zIndex={25}
                  w='1px'
                  h='100%'
                  bgColor='rgba(152, 152, 255, 0.10)'
                />
              }
            >
              <VStack
                position='relative'
                h='calc(100% - 72px)'
                py={56}
                px={56}
                shrink={0}
              >
                <Box minHeight='fit-content'>
                  <Heading id='profile-setup-heading' mb={8}>
                    Profile
                  </Heading>
                </Box>
                <VStack gap={6}>
                  <SetupStep
                    path={makePath([
                      Paths.setupProfile,
                      Paths.artist,
                      Paths.setupArtist.uploadPhoto,
                    ])}
                    active={
                      currentPath === Paths.setupArtist.uploadPhoto ||
                      currentPath === Paths.setupArtist.aboutMeAndPerks ||
                      currentPath ===
                        Paths.setupArtist.socialMediaAccounts ||
                      currentPath === Paths.setupArtist.customURL ||
                      currentPath === Paths.setupArtist.connectOnboarding
                    }
                    number={1}
                    description='upload photos'
                  />
                  <SetupStep
                    path={makePath([
                      Paths.setupProfile,
                      Paths.artist,
                      Paths.setupArtist.aboutMeAndPerks,
                    ])}
                    active={
                      currentPath === Paths.setupArtist.aboutMeAndPerks ||
                      currentPath ===
                        Paths.setupArtist.socialMediaAccounts ||
                      currentPath === Paths.setupArtist.customURL ||
                      currentPath === Paths.setupArtist.connectOnboarding
                    }
                    number={2}
                    description='about me & perks'
                  />
                  <SetupStep
                    path={makePath([
                      Paths.setupProfile,
                      Paths.artist,
                      Paths.setupArtist.socialMediaAccounts,
                    ])}
                    active={
                      currentPath ===
                        Paths.setupArtist.socialMediaAccounts ||
                      currentPath === Paths.setupArtist.customURL ||
                      currentPath === Paths.setupArtist.connectOnboarding
                    }
                    number={3}
                    description='social media accounts'
                  />
                  <SetupStep
                    path={makePath([
                      Paths.setupProfile,
                      Paths.artist,
                      Paths.setupArtist.customURL,
                    ])}
                    active={
                      currentPath === Paths.setupArtist.customURL ||
                      currentPath === Paths.setupArtist.connectOnboarding
                    }
                    number={4}
                    description='Custom URL'
                  />
                  <SetupStep
                    path={makePath([
                      Paths.setupProfile,
                      Paths.artist,
                      Paths.setupArtist.connectOnboarding,
                    ])}
                    active={
                      currentPath === Paths.setupArtist.connectOnboarding
                    }
                    number={5}
                    description='connect onboarding'
                  />
                </VStack>
              </VStack>
              <Box w='full' py={56} px={56} position='relative'>
                <VStack
                  flex={1}
                  h='calc(100% - 56px)'
                  overflow='auto'
                  css={{
                    scrollbarColor:
                      'rgba(152, 152, 255, 0.15) transparent',
                  }}
                >
                  <ClubProvider>
                    <Outlet />
                  </ClubProvider>
                </VStack>
              </Box>
            </HStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
SetupArtistDialog.dipslayName = 'SetupArtistDialog';

export default SetupArtistDialog;
