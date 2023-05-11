import { Box, Heading, Text } from '@holdr-ui/react';
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
ChannelsPage.displayName = 'ChannelsPage';
export default ChannelsPage;
