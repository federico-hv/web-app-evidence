import { Box, HStack } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import { HeaderLg, NavigationLg } from 'components';

function MainLayout() {
  return (
    <Box>
      <NavigationLg />
      <HStack h='calc(100vh - 63px)' position='relative'>
        <HeaderLg />
        <Box as='main' p={4}>
          <Outlet />
        </Box>
      </HStack>
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;
