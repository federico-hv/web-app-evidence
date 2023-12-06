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

function NotificationsPage() {
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
              Notifications
              <IconButton
                variant='ghost'
                icon='settings-outline'
                ariaLabel='settings'
              />
            </PageLayoutHeader>
            <PageLayoutContent>
              <EmptyMessage
                title='No notifications'
                subtitle='All your notifications will appear here.'
              />
            </PageLayoutContent>
          </PageLayout>
        </ContentLayoutMain>
        <ContentLayoutAside></ContentLayoutAside>
      </ContentLayout>
    </Fragment>
  );
}
NotificationsPage.displayName = 'Notifications Page';

export default NotificationsPage;
