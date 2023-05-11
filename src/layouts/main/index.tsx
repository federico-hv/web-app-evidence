import { Box } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;
