import { Box, HStack } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import { Navigation, Header } from './ui';

function MainLayout() {
  return (
    <Box>
      <Navigation />
      <HStack h='100vh' position='relative'>
        <Header />
        <Box w='full' h='full'>
          <Outlet />
        </Box>
      </HStack>
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export { MainLayout };
