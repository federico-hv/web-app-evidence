import { Box, Button, Tabs, VStack } from '@holdr-ui/react';
import SectionHeader from '../headers/section-header';
import { useNotification } from '../../shared/hooks';
import NotificationItem from '../notification-item/notification-item';
import { voidFn } from 'shared';
import { FeedEntity, Notification } from '../../index';
import { NotificationDescription } from '../notification-item';

function AllTab({ onClose }: { onClose: VoidFunction }) {
  const { data, error, loading } = useNotification('relationship');

  /* TODO: UPDATE THIS FUNCTION TO ADHERE TO NEW DATA */
  function buildNotification(notification: Notification, idx: number) {
    const type = notification.type;

    return (
      <NotificationItem key={idx} onClose={onClose}>
        <NotificationItem.Avatar
          src={notification.actor.avatar + '?random=' + Math.random()}
        />
        <NotificationItem.Details
          name={notification.actor.displayName}
          description={NotificationDescription[type](
            notification.entity.action,
          )}
          date={notification.createdAt}
        />
        {type === 'feed' && (
          <NotificationItem.MediaItem
            src={
              (notification.entity as FeedEntity).imageSrc +
              '?random=' +
              Math.random()
            }
          />
        )}
        {type === 'relationship' && (
          <NotificationItem.ActionWrapper>
            <Button onClick={voidFn}>Follow</Button>
          </NotificationItem.ActionWrapper>
        )}
      </NotificationItem>
    );
  }

  if (error || loading) return <></>;

  return (
    <Box>
      <SectionHeader onClose={onClose} />
      <VStack py={3} gap={2}>
        {data.map((notification, idx) => {
          return buildNotification(notification, idx);
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

function NotificationTabs({ onClose }: { onClose: VoidFunction }) {
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
        <AllTab onClose={onClose} />
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
