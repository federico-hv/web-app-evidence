import { Box, Heading, Tabs } from '@holdr-ui/react';
import { NotificationHeader, SectionHeader } from './ui/';

function AllTab() {
  return (
    <Box>
      <SectionHeader />
    </Box>
  );
}

/** TODO **/
function HoldrClubTab() {
  return <></>;
}

/** TODO **/
function RequestsTab() {
  return <></>;
}

export default function Notifications() {
  return (
    <Box>
      <NotificationHeader />
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
    </Box>
  );
}
