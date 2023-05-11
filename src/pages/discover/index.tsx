import { Box, Heading, Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head } from '../../components';

function DiscoverPage() {
  return (
    <>
      <Head
        title='Discover'
        description='Looking for something new? We can help you find new artists, new channels and more.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Discover page</Text>
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
DiscoverPage.displayName = 'DiscoverPage';
export default DiscoverPage;
