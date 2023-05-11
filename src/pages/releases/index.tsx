import { Box, Heading, Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head } from '../../components';

function ReleasesPage() {
  return (
    <>
      <Head
        title='Releases'
        description='View all the latest album and song releases from all the artists that you are following and more'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Releases page</Text>
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
ReleasesPage.displayName = 'ReleasesPage';
export default ReleasesPage;
