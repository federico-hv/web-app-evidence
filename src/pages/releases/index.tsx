import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  useDisclosure,
} from '@holdr-ui/react';
import { EmptyMessage, Head, makeButtonLarger } from '../../shared';
import { Fragment, useState } from 'react';
import { UnconnectedDialog } from './ui';

function ReleasesPage() {
  const disclosure = useDisclosure(true);
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
                onClick={disclosure.onOpen}
                fullWidth
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
      <UnconnectedDialog {...disclosure} />
    </Fragment>
  );
}
ReleasesPage.displayName = 'Releases Page';

export default ReleasesPage;
