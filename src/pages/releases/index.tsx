import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { Box, Button, Center, HStack, IconButton } from '@holdr-ui/react';
import { EmptyMessage, Head } from '../../shared';
import { Fragment, useState } from 'react';
import { UnconnectedDialog } from './ui';

function ReleasesPage() {
  const [firstTimeLogin] = useState(true);
  const [connected] = useState(false);
  return (
    <Fragment>
      <Head title='Releases' />
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
              {!connected ? (
                <Center mt={6} h='100%'>
                  <Button>Connect to DSP</Button>
                </Center>
              ) : (
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
        <ContentLayoutAside></ContentLayoutAside>
      </ContentLayout>
      <UnconnectedDialog isOpen={firstTimeLogin} />
    </Fragment>
  );
}
ReleasesPage.displayName = 'Releases Page';

export default ReleasesPage;
