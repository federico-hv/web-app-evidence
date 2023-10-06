import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { Box, IconButton } from '@holdr-ui/react';
import { EmptyMessage, Head } from '../../shared';
import { Fragment } from 'react';

function ReleasesPage() {
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
              <IconButton
                variant='ghost'
                icon='more-fill'
                ariaLabel='more option'
              />
            </PageLayoutHeader>
            <PageLayoutContent>
              <Box pt={4}>
                <EmptyMessage
                  title='No releases'
                  subtitle='All releases will appear here.'
                />
              </Box>
            </PageLayoutContent>
          </PageLayout>
        </ContentLayoutMain>
        <ContentLayoutAside></ContentLayoutAside>
      </ContentLayout>
    </Fragment>
  );
}
ReleasesPage.displayName = 'Releases Page';

export default ReleasesPage;
