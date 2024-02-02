import { useCurrentUser } from '../../features';
import { Box, Container, HStack, VStack } from '@holdr-ui/react';
// import { Outlet } from 'react-router-dom';
import { LgNavigation } from '../navigation';
// import { Header } from '../header';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  const currentUser = useCurrentUser();
  return (
    <VStack placeholder='' w='100vw' h='100vh'>
      {currentUser && <LgNavigation />}
      <Container maxWidth={1280} mt={80} position='relative'>
        <Box w='100%'>
          <HStack w='100%' h='100%' gap={4} placeholder=''>
            {/* Header */}
            {currentUser && <Header />}
            {/* Main */}
            <HStack
              as='main'
              gap={4}
              minHeight={0}
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
