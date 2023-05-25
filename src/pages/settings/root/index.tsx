import { Box, HStack } from '@holdr-ui/react';
import { ContentBox, Head } from '../../../components';
import { Outlet } from 'react-router-dom';

function SettingsPage() {
  return (
    <>
      <Head
        title='Settings'
        description='Configure your notifications, update your privacy settings, security settings and more.'
      />
      <HStack
        borderLeft={2}
        borderColor='base100'
        position='relative'
        t={65}
        h='calc(100vh - 65px)'
      >
        <Box
          as='aside'
          h='100%'
          w={325}
          borderRight={2}
          borderColor='base100'
        ></Box>
        <Box role='contentinfo' w='calc(100% - 325px)'>
          <ContentBox>Nothing To Display</ContentBox>
          <Outlet />
        </Box>
      </HStack>
    </>
  );
}
SettingsPage.displayName = 'SettingsPage';
export default SettingsPage;
