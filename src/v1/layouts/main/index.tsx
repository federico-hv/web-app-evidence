import { Box, Button, HStack, Text } from '@holdr-ui/react';
import { Outlet } from 'react-router-dom';
import { HeaderLg, HeaderMd, NavigationLg } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../../contexts';

function FooterSm() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {!currentUser && (
        <HStack
          items='center'
          justify='space-between'
          px={4}
          py={3}
          position='fixed'
          b={0}
          l={0}
          borderTop={2}
          borderColor='base100'
          w='100%'
          css={{ '@bp3': { display: 'none' } }}
        >
          <Text size={2}>Login or join for full experience.</Text>
          <Button
            size={{ '@bp1': 'sm', '@bp2': 'base' }}
            label='Continue'
          />
        </HStack>
      )}
    </>
  );
}

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
      <FooterSm />
    </Box>
  );
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;
