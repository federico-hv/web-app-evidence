import { Box, Heading, Text } from '@holdr-ui/react';
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
        description='View all the latest articles, posts and more from all the artists that you are following'
        url='/feeds'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Home page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <Heading as='h1' size={3} weight={500}>
            Recommended Artists
          </Heading>
          <Box h='2px' w='full' bgColor='base100' />
          <Heading as='h1' size={3} weight={500}>
            Recommended Channels
          </Heading>
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
HomePage.displayName = 'HomePage';
export default HomePage;
