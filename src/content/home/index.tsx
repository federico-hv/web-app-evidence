import { Box, Tabs } from '@holdr-ui/react';
import { ContentBox } from '../../components';

function HomeContent() {
  return (
    <Box mt={3}>
      <Tabs defaultValue='all'>
        <Tabs.List css={{ py: '$3', px: '$4' }}>
          <Tabs.Trigger value='all'>All</Tabs.Trigger>
          <Tabs.Trigger value='social'>Social</Tabs.Trigger>
          <Tabs.Trigger value='news'>News</Tabs.Trigger>
          <Tabs.Trigger value='holdr'>Holdr</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='all'>
          <ContentBox>🚧 Under construction 🚧</ContentBox>
        </Tabs.Content>
        <Tabs.Content value='social'>
          <ContentBox>🚧 Under construction 🚧</ContentBox>
        </Tabs.Content>
        <Tabs.Content value='news'>
          <ContentBox>🚧 Under construction 🚧</ContentBox>
        </Tabs.Content>
        <Tabs.Content value='holdr'>
          <ContentBox>🚧 Under construction 🚧</ContentBox>
        </Tabs.Content>
      </Tabs>
    </Box>
  );
}
HomeContent.displayName = 'HomeContent';

export default HomeContent;
