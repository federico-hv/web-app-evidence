import { Box, Tabs } from '@holdr-ui/react';
import SectionHeader from '../headers/section-header';
import { useNotification } from 'features/notifications/shared/hooks';

function AllTab() {
  const data = useNotification('relationship');
  return (
    <Box>
      <SectionHeader />
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
