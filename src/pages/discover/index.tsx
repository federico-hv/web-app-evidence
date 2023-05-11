import { Box, Heading, Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';

function DiscoverPage() {
  return (
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
  );
}
DiscoverPage.displayName = 'DiscoverPage';
export default DiscoverPage;
