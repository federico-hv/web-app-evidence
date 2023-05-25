import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { ContentBox, Head, RecommendationListsGroup } from 'components';
import { Box, HStack, Tabs, Image } from '@holdr-ui/react';

import logoDark from 'assets/images/logo-dark.png';

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

function HomeHeader() {
  return (
    <HStack
      py={4}
      justify='center'
      w='100%'
      borderBottom={2}
      borderColor='base100'
      css={{ '@bp3': { display: 'none' } }}
    >
      <Image size={25} src={logoDark} />
    </HStack>
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
          <HomeHeader />
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
