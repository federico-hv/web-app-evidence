import { Box, HStack } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import { Navigation, Header, Footer } from './ui';
import { useCurrentUser } from '../auth';

function MainLayout() {
  const currentUser = useCurrentUser();
  return (
    <Box>
      {currentUser && <Navigation />}
      <HStack h='100vh' position='relative'>
        {currentUser && <Header />}
        <Box w='full' h='full'>
          <Outlet />
        </Box>
        <Footer />
      </HStack>
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export { MainLayout };
