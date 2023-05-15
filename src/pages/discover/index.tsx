import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
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
DiscoverPage.displayName = 'DiscoverPage';
export default DiscoverPage;
