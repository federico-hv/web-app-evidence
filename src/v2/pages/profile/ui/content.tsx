import { Box, Tabs } from '@holdr-ui/react';
import { ContextBox } from '../../../packages';

function Content() {
  return (
    <Box mt={4} px={5}>
      <Tabs defaultValue='posts'>
        <Tabs.List variant='link'>
          <Tabs.Trigger value='posts'>Post</Tabs.Trigger>
          <Tabs.Trigger value='articles'>Articles</Tabs.Trigger>
          <Tabs.Trigger value='releases'>Releases</Tabs.Trigger>
          <Tabs.Trigger value='club'>Club</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='posts'>
          <ContextBox> Nothing to display</ContextBox>
        </Tabs.Content>
        <Tabs.Content value='articles'>
          <ContextBox>Nothing to display</ContextBox>
        </Tabs.Content>
        <Tabs.Content value='releases'>
          <ContextBox>Nothing to display</ContextBox>
        </Tabs.Content>
        <Tabs.Content value='club'>
          <ContextBox>Nothing to display</ContextBox>
        </Tabs.Content>
      </Tabs>
    </Box>
  );
}
Content.displayName = 'Content';

export default Content;
