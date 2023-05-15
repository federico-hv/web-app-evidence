import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { Head } from 'components';

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
          <Text role='contentinfo'>Home page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <VStack divider={<StackDivider />} gap={4}>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Artists
            </Heading>
            <Heading as='h1' casing='uppercase' size={3} weight={500}>
              Recommended Channels
            </Heading>
          </VStack>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
HomePage.displayName = 'HomePage';
export default HomePage;
