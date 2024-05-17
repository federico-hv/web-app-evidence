import {
  CompleteArtistSetupBanner,
  useCurrentUser,
  useRequiresProfileUpdate,
} from '../../features';
import { Box, Container, HStack, VStack } from '@holdr-ui/react';
import { LgNavigation } from '../navigation';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Loader } from '../../shared';

function MainHeader({ needsBanner }: { needsBanner: boolean }) {
  const [marginTop, setMargin] = useState(needsBanner ? 80 : 0);

  return (
    <Fragment>
      <VStack mt={marginTop}>
        {needsBanner && (
          <CompleteArtistSetupBanner onClose={() => setMargin(0)} />
        )}
        <LgNavigation />
      </VStack>
    </Fragment>
  );
}

function MainLayout() {
  //TODO:  Add this to global state
  const { data, loading } = useRequiresProfileUpdate();

  const currentUser = useCurrentUser();

  return (
    <Loader loading={loading}>
      {data && (
        <VStack w='100vw' h='100vh'>
          {currentUser && (
            <MainHeader needsBanner={data.requiresProfileUpdate} />
          )}
          <Container maxWidth={1280} mt={80} position='relative'>
            <Box w='100%'>
              <HStack w='100%' h='100%' gap={4}>
                {/* Header */}
                {currentUser && <Header />}
                {/* Main */}
                <HStack
                  as='main'
                  gap={4}
                  h='calc(100% - (64px + $4))'
                  minWidth={{
                    '@bp1': 'calc(100% - (90px + $4))',
                    '@bp5': 'calc(100% - (308px + $4))',
                  }}
                  flex={1}
                  mb={4}
                  position='relative'
                  css={{ flexShrink: 0 }}
                >
                  <Outlet />
                </HStack>
              </HStack>
            </Box>
          </Container>
        </VStack>
      )}
    </Loader>
  );
}

export default MainLayout;
