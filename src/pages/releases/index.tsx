import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
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
ReleasesPage.displayName = 'ReleasesPage';
export default ReleasesPage;
