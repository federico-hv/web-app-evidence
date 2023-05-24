import { Box, HStack } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import {
  HeaderLg,
  HeaderMd,
  NavigationLg,
  NavigationSm,
} from 'components';

function MainLayout() {
  return (
    <Box>
      <NavigationLg />
      <HStack h='calc(100vh - 65px)' position='relative'>
        <HeaderLg />
        <HeaderMd />
        <Box w='full' h='full'>
          <Outlet />
        </Box>
      </HStack>
      <NavigationSm />
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;
