import { Box, Button, Tabs, VStack } from '@holdr-ui/react';
import SectionHeader from '../headers/section-header';
import { useNotification } from '../../shared/hooks';
import NotificationItem from '../notification-item';
import { DateUtility, voidFn } from 'shared';
import { FeedEntity, Notification } from '../../index';

function AllTab() {
  const { data, error, loading } = useNotification('relationship');

  /* TODO: UPDATE THIS FUNCTION TO ADHERE TO NEW DATA */
  function buildNotification(notification: Notification) {
    const type = notification.type;
    return (
      <NotificationItem>
        <NotificationItem.Avatar
          src={notification.actor.avatar + '?random=' + Math.random()}
        />
        <NotificationItem.Details
          name={notification.actor.displayName}
          description={
            type == 'relationship'
              ? 'followed you'
              : notification.entity.action + ' a recent post'
          }
          date={notification.createdAt}
        />
        {type == 'relationship' && (
          <NotificationItem.MediaItem
            mediaItem={
              (notification.entity as FeedEntity).imageSrc +
              '?random=' +
              Math.random()
            }
          />
        )}
        {type == 'feed' && (
          <NotificationItem.ActionButton>
            <Button onClick={voidFn}>Follow</Button>
          </NotificationItem.ActionButton>
        )}
      </NotificationItem>
    );
  }

  if (error || loading) return <></>;

  return (
    <Box>
      <SectionHeader />
      <VStack py={3} gap={5}>
        {data.map((notification, idx) => {
          return buildNotification(notification);
        })}
      </VStack>
    </Box>
  );
}

/* TODO */
function HoldrClubTab() {
  return <></>;
}

/* TODO */
function RequestsTab() {
  return <></>;
}

function NotificationTabs() {
  return (
    <Tabs defaultValue='all'>
      <Box pt={4} pb={4}>
        <Tabs.List gap={3}>
          <Tabs.Trigger value='all'>All</Tabs.Trigger>
          <Tabs.Trigger value='holdrClub'>Holdr Club</Tabs.Trigger>
          <Tabs.Trigger value='requests'>Requests</Tabs.Trigger>
        </Tabs.List>
      </Box>
      <Tabs.Content value='all'>
        <AllTab />
      </Tabs.Content>
      <Tabs.Content value='all'>
        <HoldrClubTab />
      </Tabs.Content>
      <Tabs.Content value='all'>
        <RequestsTab />
      </Tabs.Content>
    </Tabs>
  );
}

AllTab.displayName = 'AllTab';
HoldrClubTab.displayName = 'HoldrClubTab';
RequestsTab.displayName = 'RequestsTab';

export default NotificationTabs;
