import { useCurrentUser } from '../../features';
import { Box, HStack } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import { LgNavigation, SmNavigation } from '../navigation';
import { Header } from '../header';

function MainLayout() {
  const currentUser = useCurrentUser();
  return (
    <Box>
      {currentUser && <LgNavigation />}
      <HStack h='100vh' position='relative'>
        {currentUser && <Header />}
        <Box className='main-outlet' w='full' h='full'>
          <Outlet />
        </Box>
        <SmNavigation />
      </HStack>
    </Box>
  );
}

export default MainLayout;
