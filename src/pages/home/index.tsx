import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { ContentBox, Head, RecommendationListsGroup } from 'components';
import { Box, Tabs } from '@holdr-ui/react';

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

function HomePage() {
  return (
    <>
      <Head
        title='Feeds'
        description='View all the latest articles, posts and more from all the artists that you are following.'
        url='/feeds'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <HomeContent />
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
HomePage.displayName = 'HomePage';
export default HomePage;
