import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head } from '../../components';

function ChannelsPage() {
  return (
    <>
      <Head
        title='Channels'
        description='Connect with other users that share the same interests as you do, and get personal with artists you follow.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Channels page</Text>
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
ChannelsPage.displayName = 'ChannelsPage';
export default ChannelsPage;
