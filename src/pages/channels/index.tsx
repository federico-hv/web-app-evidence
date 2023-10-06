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

function ChannelsPage() {
  return (
    <Fragment>
      <Head title='Channels' />
      <ContentLayout>
        <ContentLayoutMain>
          <PageLayout>
            <PageLayoutHeader
              position='sticky'
              t={0}
              css={{ backgroundColor: '#FFF', zIndex: 10 }}
            >
              Channels
              <IconButton
                variant='ghost'
                icon='add'
                ariaLabel='add channel'
              />
            </PageLayoutHeader>
            <PageLayoutContent>
              <Box pt={4}>
                <EmptyMessage
                  title='No channels'
                  subtitle='All channels will appear here.'
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
ChannelsPage.displayName = 'Channels Page';

export default ChannelsPage;
