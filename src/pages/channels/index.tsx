import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head, RecommendationListsGroup } from '../../components';

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
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
ChannelsPage.displayName = 'ChannelsPage';
export default ChannelsPage;
