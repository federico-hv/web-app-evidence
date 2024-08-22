import { CompleteArtistSetupBanner } from '../../features';
import { Box, Container, HStack, VStack } from '@holdr-ui/react';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';
import Banners from '../banners';
import {
  Navigation,
  NavigationActions,
  NavigationContent,
  NavigationLogo,
  NavigationNotificationsPopover,
  NavigationSearch,
  NavigationSettingsPopover,
  NavigationSpacer,
} from '../navigation';

function MainLayout() {
  return (
    <VStack w='100vw' h='100vh'>
      <Banners>
        <CompleteArtistSetupBanner />
      </Banners>
      <Navigation bgColor='transparent'>
        <NavigationContent>
          <NavigationLogo />
          <NavigationSearch />
          <NavigationActions>
            <NavigationNotificationsPopover />
            <NavigationSettingsPopover />
          </NavigationActions>
        </NavigationContent>
        <NavigationSpacer />
      </Navigation>
      <Container maxWidth={1280} mt={80} position='relative'>
        <Box w='100%'>
          <HStack w='100%' h='100%' gap={4}>
            {/* Header */}
            <Header />
            {/* Main */}
            <HStack
              as='main'
              gap={4}
              h='calc(100vh - (64px + $4))'
              minWidth={{
                '@bp1': 'calc(100% - (90px + $4))',
                '@bp5': 'calc(100% - (308px + $4))',
              }}
              flex={1}
              position='relative'
              css={{ flexShrink: 0 }}
            >
              <Outlet />
            </HStack>
          </HStack>
        </Box>
      </Container>
    </VStack>
  );
}

export default MainLayout;
