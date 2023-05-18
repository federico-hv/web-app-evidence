import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head, RecommendationListsGroup } from '../../components';

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
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
DiscoverPage.displayName = 'DiscoverPage';
export default DiscoverPage;
