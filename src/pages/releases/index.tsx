import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { Box, Button, Center, HStack, IconButton } from '@holdr-ui/react';
import {
  EmptyMessage,
  Head,
  makeButtonLarger,
  makePath,
  useNavigateWithPreviousLocation,
  Paths,
  GQLRenderer,
} from '../../shared';
import { Fragment, useEffect, useState } from 'react';
import { useIsConnected } from '../../features';

function ReleasesPage() {
  return (
    <Fragment>
      <Head title='Releases' />
      <GQLRenderer ErrorFallback={() => <Fragment />}>
        <Content />
      </GQLRenderer>
    </Fragment>
  );
}
ReleasesPage.displayName = 'Releases Page';

function Content() {
  const isConnected = useIsConnected(['spotify', 'apple music']);

  const navigate = useNavigateWithPreviousLocation();

  const setupPath = makePath([
    Paths.setupFlow,
    Paths.releases,
    'get-started',
  ]);

  const [connected] = useState(false);

  useEffect(() => {
    if (!isConnected) navigate(setupPath, !connected);
  }, []);

  return (
    <ContentLayout>
      <ContentLayoutMain>
        <PageLayout>
          <PageLayoutHeader
            position='sticky'
            t={0}
            css={{ backgroundColor: '#FFF', zIndex: 10 }}
          >
            Releases
            <HStack items='center'>
              <IconButton
                variant='ghost'
                icon='settings-outline'
                ariaLabel='releases settings'
              />
            </HStack>
          </PageLayoutHeader>
          <PageLayoutContent>
            {connected && (
              <Box pt={4}>
                <EmptyMessage
                  title='No releases'
                  subtitle='All releases will appear here.'
                />
              </Box>
            )}
          </PageLayoutContent>
        </PageLayout>
      </ContentLayoutMain>
      <ContentLayoutAside>
        {!connected ? (
          <Center px={4} mt={4} w='100' h='100%'>
            <Button
              fullWidth
              onClick={() => navigate(setupPath, true)}
              className={makeButtonLarger('2.5rem')}
            >
              Get Started
            </Button>
          </Center>
        ) : (
          <Fragment />
        )}
      </ContentLayoutAside>
    </ContentLayout>
  );
}

export default ReleasesPage;
