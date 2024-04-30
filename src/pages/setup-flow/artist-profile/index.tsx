import { Paths, prefix } from '../../../shared';
import { useCurrentUser } from '../../../features';
import {
  Box,
  Dialog,
  Heading,
  HStack,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SetupStep } from './ui';

function SetupArtistFlow() {
  const height = {
    [Paths.setupArtist.uploadPhoto]: 785,
    [Paths.setupArtist.aboutMeAndPerks]: 615,
    [Paths.setupArtist.socialMediaAccounts]: 625,
    [Paths.setupArtist.customURL]: 500,
    [Paths.setupArtist.connectOnboarding]: 785,
  };

  const user = useCurrentUser();
  const disclosure = useDisclosure(true);

  const location = useLocation();
  const navigate = useNavigate();

  // remove "" from '/' splitting
  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  const onClose = () => {
    const previousLocation = location.state?.previousLocation;

    navigate(previousLocation || prefix('/', user ? user.username : ''));
  };

  useEffect(() => {
    if (currentPath === Paths.artist) navigate('upload-photos');
  }, []);

  return (
    <Dialog {...disclosure} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay zIndex={15} />
        <Dialog.Content
          zIndex={20}
          bgColor='#30304B'
          position='relative'
          w={{ '@bp1': '100%', '@bp3': '90vw' }}
          maxWidth={882}
          minHeight={{ '@bp1': '100%', '@bp3': '500px' }}
          h={{ '@bp1': '1px', '@bp3': height[currentPath] || '500px' }}
          maxHeight={{ '@bp1': '100vh', '@bp3': '95vh' }}
          radius={{ '@bp1': 0, '@bp3': 2 }}
          transitionProperty='all'
          transitionDuration='0.25s'
          transitionTimingFunction='easeInOut'
        >
          <Dialog.Body h='full'>
            <Box pt='1.5rem' px='3rem' minHeight='fit-content'>
              <Heading mb={8}>Profile</Heading>
            </Box>
            <HStack
              px='3rem'
              position='relative'
              h='calc(100% - 6rem)'
              pb='1.5rem'
              gap={8}
              divider={
                <Box
                  w='1px'
                  h='100%'
                  bgColor='rgba(152, 152, 255, 0.10)'
                />
              }
            >
              <VStack gap={6}>
                <SetupStep
                  path={Paths.setupArtist.uploadPhoto}
                  active={currentPath === Paths.setupArtist.uploadPhoto}
                  number={1}
                  description='upload photos'
                />
                <SetupStep
                  path={Paths.setupArtist.aboutMeAndPerks}
                  active={
                    currentPath === Paths.setupArtist.aboutMeAndPerks
                  }
                  number={2}
                  description='about me & perks'
                />
                <SetupStep
                  path={Paths.setupArtist.socialMediaAccounts}
                  active={
                    currentPath === Paths.setupArtist.socialMediaAccounts
                  }
                  number={3}
                  description='social media accounts'
                />
                <SetupStep
                  path={Paths.setupArtist.customURL}
                  active={currentPath === Paths.setupArtist.customURL}
                  number={4}
                  description='Custom URL'
                />
                <SetupStep
                  path={Paths.setupArtist.connectOnboarding}
                  active={
                    currentPath === Paths.setupArtist.connectOnboarding
                  }
                  number={5}
                  description='connect onboarding'
                />
              </VStack>
              <VStack flex={1} mb='4rem' overflow='auto'>
                <Outlet />
              </VStack>
            </HStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
SetupArtistFlow.dipslayName = 'SetupArtistFlow';

export default SetupArtistFlow;
